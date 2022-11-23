import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
// import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useEffect, useRef, useState } from 'react'


const libraries = ['places']
function MapArea(props) {
  const [value, setValue] = useState({lat:"",lon:""});
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setValue({
        lat:position.coords.latitude,
        lon:position.coords.longitude
      })
    });
  });
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: 'AIzaSyDCUiR6W8hmQI3vEn_LkQebO2iIhKQJOfo',
    googleMapsApiKey: 'AIzaSyDFhHolRp7YU58k2pLeTHcEw2oLhpAT--w',
    libraries: libraries,
  })
  const center = { lat: parseFloat(props.match.params.lat), lng: parseFloat(props.match.params.lon) }
  // const center1 = { lat: parseFloat(value.lat), lng: parseFloat(value.lon) }
  
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }
  
  
  async function calculateRoute() {

    

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    // if(value.lat && value.lon){
    const results = await directionsService.route({
      origin: { lat: parseFloat(value.lat), lng: parseFloat(value.lon)},
      destination: { lat: parseFloat(props.match.params.lat), lng: parseFloat(props.match.params.lon)},
      
      // origin: { lat: parseFloat(45.4874546), lng: parseFloat(-73.5745793)},
      // destination: { lat: parseFloat(45.49493751227042), lng: parseFloat(-73.62394697318513)},
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    console.log(results,'results')
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    // }
  }

  // function clearRoute() {
  //   setDirectionsResponse(null)
  //   setDistance('')
  //   setDuration('')
  //   originRef.current.value = ''
  //   destiantionRef.current.value = ''
  // }
  

  

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {/* <Marker position={center1} /> */}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            {/* <Autocomplete >
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete> */}
          </Box>
          <Box flexGrow={1}>
            {/* <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete> */}
          </Box> 

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Check Route From Current Location
            </Button>
           
            {/* <IconButton
              aria-label='center back'
              // icon={<FaTimes />}
              onClick={clearRoute}
            /> */}
          </ButtonGroup>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          {/* <IconButton
            aria-label='center back'
            // icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          /> */}
        </HStack>
      </Box>
    </Flex>
  )
}

export default MapArea