import { FC, Fragment, useState } from "react"
import BottomDrawer from "../drawers/bottomDrawer"
import LocationUnitsList from "@/src/components/locationUnitsList"
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
  function handleRegisterClick() {
    setCurrentState(LocationFormState.Register)
  }

  function handleBackToLocationClick() {
    setCurrentState(LocationFormState.Location)
  }

  return <Fragment>
    {
      <BottomDrawer open={open} onClose={onClose}>
        {currentState === LocationFormState.Location && <LocationUnitsList/>}
        {currentState === LocationFormState.Register && <VolunteerRegisterForm onBackToLocation={handleBackToLocationClick} />}
      </BottomDrawer>
    }
  </Fragment>
}

export default LocationPanel
