import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { DialogPopUp } from 'components'
import { RELATIONSHIP_CUSTOM_FIELD } from 'constant'
import { Importer, ImporterField } from 'containers/ImportCSV'
import { useCheckUser } from 'hooks/useCheckUser'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { apiUploadCsv } from 'services/apiUploadCsv'
import { getCsvUploadUrl, getDefinitionsByType } from 'utils'

import useStyles from './styles'

const RelationshipCSVUploader = ({ companyId, dispatch, definitions }) => {
  const CHUNK_SIZE = 10000
  const { t } = useTranslation('relationships')
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const [fileContext, setFileContext] = useState({ name: '', size: 0, currentBatch: 0, totalBatches: 0 })

  const fileContextRef = useRef(fileContext)

  const updateFileContext = (name, size, currentBatch, totalBatches) => {
    const fc = { name: name, size: size, currentBatch: currentBatch, totalBatches: totalBatches }
    setFileContext(fc)
    fileContextRef.current = fc
  }

  const customFileds = getDefinitionsByType(definitions, RELATIONSHIP_CUSTOM_FIELD)

  const handleCloseImport = useCallback(() => {
    dispatch({ type: 'SET_IS_CSV_IMPORT', payload: false })
  }, [dispatch])

  const handleDialogClose = () => {
    setIsOpen(false)
  }

  const handleOpenDialog = () => {
    setIsOpen(true)
  }

  const { session } = useCheckUser()
  const uploadUrl = getCsvUploadUrl(companyId)

  const getChunkCount = (fileSize, chunkSize) => {
    return Math.ceil(fileSize / chunkSize)
  }

  const rows = [
    {
      name: 'Name',
      description:
        'This is the name of the company. It is required. If a company does not have a name in your import, it will not be imported',
    },
    {
      name: 'Address Line 1',
      description: 'An optional address line.',
    },
    {
      name: 'Address Line 2',
      description: 'An optional second address line.',
    },
    {
      name: 'Address Line 3',
      description: 'An optional third address line',
    },
    {
      name: 'City',
      description: 'An optional city.',
    },
    {
      name: 'Postal Code',
      description: 'An optional address postal code',
    },
    {
      name: 'State Or Province',
      description: 'An optional address state or province.',
    },
    {
      name: 'Country',
      description: 'An optional country.',
    },
    {
      name: 'Phone Number',
      description: 'An optional phone number.',
    },
    {
      name: 'Website Url',
      description:
        'Optional (but encouraged) website URL for the company being imported. It helps us locate existing matches for enrichment from our ecosystem of data.',
    },
    {
      name: 'Description',
      description: 'Any description of the company. This is private to you.',
    },
    {
      name: 'Origin ID',
      description:
        'Optional ID for the company as it appears in the external system or list you are importing from. This ID allows for updates of existing data.',
    },
    {
      name: 'Export ID',
      description:
        'Only applies to lists that you have exported from Expandigo and are now re-importing. This ID appears in those lists. This ID allows for updates of existing data.',
    },
    {
      name: 'Social Links',
      description:
        'Comma-separated list of any social presence links, i.e. LinkedIn profile URL, Twitter profile URL, etc.',
    },
    {
      name: 'Sources',
      description:
        'Comma-separated list of sources. Names must match “exactly” your list of Sources in Relationships → Settings',
    },
    {
      name: 'Relationship Types',
      description:
        'Comma-separated list of sources. Names must match "exactly" your list of Relationship Types in Relationships -> Settings.',
    },
    {
      name: 'Standard Tags',
      description:
        'Comma-separated list of sources. Names must match "exactly" your list of Standard Tags in Relationships -> Settings.',
    },
  ]

  return (
    <>
      <Paper elevation={2} className={classes.csvContainer}>
        <Box mb={9}>
          <Box className={classes.csvContainerHead}>
            <Typography variant="h4" sx={{ mr: '50px' }}>
              {t('Import New Relationships')}
            </Typography>

            <Button
              variant="outlined"
              target="_blank"
              rel="noopener noreferrer"
              href="/static/Relationships_CSV_Sample.csv"
              download
            >
              {t('Download Sample')}
            </Button>

            <IconButton className={classes.closeCSVImport} onClick={handleCloseImport}>
              <Tooltip title={t('Close')} placement="top" arrow>
                <CloseIcon size={'small'} />
              </Tooltip>
            </IconButton>
          </Box>

          <Box className={classes.closeCSVImportInfo}>
            <InfoIcon fontSize="small" sx={{ mr: '5px' }} />

            <Typography variant="caption">
              You can read the{' '}
              <Typography
                variant="caption"
                sx={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'underline rgba(25, 118, 210, 0.4)' }}
                onClick={handleOpenDialog}
              >
                definition of each column
              </Typography>{' '}
              for a more accurate import of relationships.
            </Typography>
          </Box>
        </Box>

        <Box className={classes.csvImporter}>
          <Importer
            chunkSize={CHUNK_SIZE}
            restartable={false}
            assumeNoHeaders={false}
            onStart={async ({ file }) => {
              updateFileContext(file.name, file.size, 1, getChunkCount(file.size, CHUNK_SIZE))
              console.log('Began import of file', file.name, '.')
            }}
            processChunk={async (rows) => {
              if (session && session.accessToken) {
                await apiUploadCsv(session.accessToken, uploadUrl, rows, {
                  mode: 'override',
                  name: fileContextRef.current.name,
                  type: 'CompanyRelationship',
                  batch: {
                    current: fileContextRef.current.currentBatch,
                    total: fileContextRef.current.totalBatches,
                  },
                  object: {
                    total: rows.length,
                  },
                })
              }
              await new Promise((resolve) => setTimeout(resolve, 500))
            }}
            onComplete={async ({ file }) => {
              console.log('Finished import of file', file.name, '.')
            }}
            onClose={() => {
              dispatch({ type: 'SET_IS_CSV_IMPORT', payload: false })
              toast('🚀  CSV imported successfully')
            }}
          >
            <ImporterField name="name" label="Name" config={{ maxLength: 128 }} />
            <ImporterField name="addressLine1" label="Address Line 1" optional config={{ maxLength: 128 }} />
            <ImporterField name="addressLine2" label="Address Line 2" optional config={{ maxLength: 128 }} />
            <ImporterField name="addressLine3" label="Address Line 3" optional config={{ maxLength: 128 }} />
            <ImporterField name="city" label="City" optional config={{ maxLength: 64 }} />
            <ImporterField name="postalCode" label="Postal Code" optional config={{ maxLength: 32 }} />
            <ImporterField name="stateOrProvince" label="State Or Province" optional config={{ maxLength: 32 }} />
            <ImporterField name="country" label="Country" optional config={{ maxLength: 64 }} />
            <ImporterField name="phoneNumber" label="Phone Number" optional config={{ maxLength: 32 }} />
            <ImporterField name="websiteUrl" label="Website Url" optional config={{ maxLength: 256 }} />
            <ImporterField name="description" label="Description" optional config={{ maxLength: 512 }} />
            <ImporterField name="alt-id:originId" label="Origin ID" optional config={{ maxLength: 128 }} />
            <ImporterField name="id:exportId" label="Export ID" optional config={{ maxLength: 256 }} />
            <ImporterField name="array:socialLinks" label="Social Links" optional />
            <ImporterField name="definition:sources" label="Sources" optional />
            <ImporterField name="definition:types" label="Relationship Types" optional />
            <ImporterField name="definition:standardTags" label="Standard Tags" optional config={{ maxLength: 256 }} />
            {customFileds.map(({ name, id }) => (
              <ImporterField key={id} name={`custom:${id}`} label={name} optional />
            ))}
          </Importer>
        </Box>
      </Paper>

      <DialogPopUp
        isOpenModal={isOpen}
        title={'Column definitions'}
        closeModal={handleDialogClose}
        handleAccept={handleDialogClose}
        maxWidth={'md'}
      >
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f77d' }}>
              <TableRow>
                <TableCell sx={{ width: '180px' }}>Column Name</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogPopUp>
    </>
  )
}

export default RelationshipCSVUploader
