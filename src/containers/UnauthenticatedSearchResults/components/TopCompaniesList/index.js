import { Arrow } from '@egjs/flicking-plugins'
import Flicking, { ViewportSlot } from '@egjs/react-flicking'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
// import SearchIcon from '@mui/icons-material/Search'
import ShareIcon from '@mui/icons-material/Share'
import { Avatar, Badge, Box, Divider, IconButton, List, ListItem, Tooltip, Typography } from '@mui/material'
import Chance from 'chance'
import clsx from 'clsx'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { capitalizeFirstLetters } from 'utils'

import useStyles from './styles'

const ITEM_WIDTH = 180

const TopCompaniesList = ({ shadowBg }) => {
  const classes = useStyles()
  const chance = new Chance()
  const plugins = [new Arrow()]
  const [expanded, setExpanded] = useState(false)
  const [isPrev, setIsPrev] = useState(false)
  const [isNext, setIsNext] = useState(false)
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6])

  const expandedStyles = useSpring({ width: expanded ? `100%` : `75%` })
  const prevStyles = useSpring({ opacity: isPrev ? 1 : 0, visibility: isPrev ? 'visible' : 'hidden' })
  const nextStyles = useSpring({ opacity: isNext ? 1 : 0, visibility: isNext ? 'visible' : 'hidden' })

  const handleExpandUnlimitedItems = useCallback(() => {
    setExpanded(true)
    setIsNext(true)
    setItems((prev) => [...prev, 7, 8, 9, 10, 11, 12, 13, 14, 15])
  }, [])

  const handleChanged = useCallback(
    ({ index, prevIndex }) => {
      if (!isNext && index < prevIndex) {
        setIsNext(true)
      }

      if (index > 0) {
        setIsPrev(true)
      } else {
        setIsPrev(false)
      }
    },
    [isNext]
  )

  const handleReachEdge = useCallback(({ direction }) => {
    if (direction === 'NEXT') {
      setIsNext(false)
    }
  }, [])

  return (
    <>
      <Typography variant="h6" sx={{ mb: '7px' }}>
        Expandigo Top Companies
      </Typography>

      <animated.div style={expandedStyles} className={classes.searchResultsTop}>
        <Flicking
          align={'prev'}
          bound
          renderOnlyVisible={true}
          plugins={plugins}
          onChanged={handleChanged}
          onReachEdge={handleReachEdge}
        >
          {items.map((item) => (
            <Box style={{ width: ITEM_WIDTH }} className={classes.searchItemTop} key={item}>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mb={2}>
                <Avatar src={chance.avatar()} sx={{ width: 40, height: 40 }}>
                  {capitalizeFirstLetters(chance.company())}
                </Avatar>
              </Box>

              <Badge badgeContent={<Image width={12} height={12} alt="Expandigo" src={`/static/paidLevelIcon.svg`} />}>
                <Typography
                  variant="h6"
                  noWrap
                  lineHeight={1}
                  sx={{ pr: '5px', mb: '5px' }}
                  className={classes.searchItemTopName}
                >
                  Siebel Systems Inc
                </Typography>
              </Badge>

              <ul className={classes.subList}>
                <li>
                  <Typography variant="caption" fontSize={'11px'}>
                    Furniture
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption" fontSize={'11px'}>
                    TF, Nunoma
                  </Typography>
                </li>
              </ul>

              <Typography variant="body2" color={'#00000099'} fontSize={'13px'}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum ab, corporis nesciunt neque illum
                natus perspiciatis.
              </Typography>

              <List
                sx={{
                  p: 0,
                  mt: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '& li': { p: 0 },
                  '& svg': { color: '#888', fontSize: '15px' },
                }}
              >
                <ListItem>
                  <Tooltip title="Share" arrow placement="top">
                    <IconButton size="small">
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
                <ListItem>
                  <Tooltip title="Connect" arrow placement="top">
                    <IconButton size="small">
                      <PersonAddIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
                <ListItem>
                  <Tooltip title="Follow" arrow placement="top">
                    <IconButton size="small">
                      <BookmarkIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
                {/*                 <ListItem>
                  <Tooltip title="More Like This" arrow placement="top">
                    <IconButton size="small">
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem> */}
              </List>
            </Box>
          ))}

          <Box style={{ width: 115 }} className={clsx(classes.searchItemTop, classes.showAllCompanies)}>
            <Typography
              textAlign={'center'}
              fontSize={'13px'}
              color={'#1976d2'}
              sx={{ '&:hover': { textDecoration: 'underline' }, mt: '14px', cursor: 'pointer' }}
            >
              All Companies
            </Typography>

            <ArrowForwardIcon fontSize="small" />
          </Box>

          <ViewportSlot>
            <animated.div className="flicking-arrow-prev" style={prevStyles}>
              <IconButton className={classes.button}>
                <KeyboardArrowLeftIcon />
              </IconButton>
            </animated.div>

            <animated.div className="flicking-arrow-next" style={nextStyles}>
              <IconButton className={classes.button}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </animated.div>
          </ViewportSlot>
        </Flicking>

        {!expanded && (
          <IconButton className={classes.expandResults} onClick={handleExpandUnlimitedItems}>
            <DoubleArrowIcon />
          </IconButton>
        )}

        {!expanded && (
          <Box
            sx={{ background: shadowBg ? shadowBg : 'linear-gradient(90deg,rgba(255, 255, 255, .40) 0%,#fff 80%)' }}
          ></Box>
        )}
      </animated.div>

      <Divider sx={{ mb: '24px', mt: '27px' }} />
    </>
  )
}

export default TopCompaniesList
