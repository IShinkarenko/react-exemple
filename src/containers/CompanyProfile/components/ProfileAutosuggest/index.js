import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material'
import { DialogPopUp } from 'components'
import { useCompanySubscriptionLevel } from 'hooks/useCompanySubscriptionLevel'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import routes from 'routes'

import useStyles from './styles'

const ProfileAutosuggest = () => {
  const classes = useStyles()
  const router = useRouter()
  const {
    query: { companyId },
  } = router
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState({})
  const [expanded, setExpanded] = useState(false)
  const { isCompanyBasic } = useCompanySubscriptionLevel()
  const fields = [
    {
      label: 'Description',
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit pariatur nostrum fuga qui quidem voluptatum saepe',
    },
    {
      label: 'Company Size',
      value: '1000+',
    },
    {
      label: 'Founded Year',
      value: '2018',
    },
    {
      label: 'Website',
      value: 'https://test-website.com/',
    },
  ]

  const handleDialogClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleDialogOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleCheck = useCallback((event) => {
    setChecked((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }))
  }, [])

  const handleOpenPlans = useCallback(() => {
    router.push({
      pathname: routes.companySubscription,
      query: { companyId },
    })
  }, [companyId, router])

  return (
    <>
      <Box className={classes.upgradeProfile}>
        <TipsAndUpdatesIcon sx={{ fontSize: '15px', mr: '5px' }} />
        <Typography variant="caption" sx={{ mr: '5px' }}>
          Want help completing your profile?
        </Typography>
        {isCompanyBasic ? (
          <Typography variant="caption">
            <span className={classes.upgradeCTA} onClick={handleOpenPlans}>
              Upgrade
            </span>{' '}
            to import your existing social presence with AI suggested improvements.
          </Typography>
        ) : (
          <Typography variant="caption">
            <span className={classes.upgradeCTA} onClick={handleDialogOpen}>
              Import
            </span>{' '}
            your existing social presence with AI suggested improvements.
          </Typography>
        )}
      </Box>

      <DialogPopUp
        title="Add to profile"
        successTitle="Add"
        isOpenModal={open}
        closeModal={handleDialogClose}
        maxWidth={'md'}
        dialogContentClasses={classes.resetPadding}
        className={classes.dialogAutosuggest}
      >
        {fields.map(({ label, value }, index) => (
          <Accordion
            key={index}
            expanded={expanded === label}
            onChange={handleChange(label)}
            disableGutters
            elevation={0}
            square
            classes={{ expanded: classes.expanded }}
            sx={{ '& .MuiAccordionSummary-content': { margin: '7px 0' } }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1bh-header">
              <FormControlLabel
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox name={label} checked={checked[label]} onChange={handleCheck} size="small" />}
                label={label}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ pl: '29px' }}>
                {value}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </DialogPopUp>
    </>
  )
}

export default ProfileAutosuggest
