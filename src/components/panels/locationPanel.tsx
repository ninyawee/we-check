import { FC, Fragment, useState } from "react"
import BottomDrawer from "../drawers/bottomDrawer"
import LocationInfoForm from "../forms/locationInfoForm"
import VolunteerRegisterForm from "../forms/volunteerRegisterForm.tsx"
import { useMediaQuery } from "@mui/material"
import { useLayoutStore } from "@/src/store/layout.store"

enum LocationFormState {
  Location,
  Register
}

const LocationPanel: FC<{
  open: boolean,
  onClose: () => void
}> = ({ open, onClose }) => {
  const [currentState, setCurrentState] = useState<LocationFormState>(LocationFormState.Location)
  const { isDesktopConfirm } = useLayoutStore()
  const matchDesktop = useMediaQuery('(min-width:900px)')

  function handleRegisterClick() {
    setCurrentState(LocationFormState.Register)
  }

  function handleBackToLocationClick() {
    setCurrentState(LocationFormState.Location)
  }

  return <Fragment>
    {(matchDesktop && !isDesktopConfirm) ?
      <></> :
      <BottomDrawer open={open} onClose={onClose}>
        {currentState === LocationFormState.Location && <LocationInfoForm/>}
        {currentState === LocationFormState.Register && <VolunteerRegisterForm onBackToLocation={handleBackToLocationClick} />}
      </BottomDrawer>
    }
  </Fragment>
}

export default LocationPanel
