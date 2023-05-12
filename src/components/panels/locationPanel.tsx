import { FC, useState } from "react"
import BottomDrawer from "../drawers/bottomDrawer"
import LocationInfoForm from "../forms/locationInfoForm"
import VolunteerRegisterForm from "../forms/volunteerRegisterForm.tsx"

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

  return <BottomDrawer open={open} onClose={onClose}>
    {currentState === LocationFormState.Location && <LocationInfoForm onRegister={handleRegisterClick} />}
    {currentState === LocationFormState.Register && <VolunteerRegisterForm onBackToLocation={handleBackToLocationClick}/>}
  </BottomDrawer>
}

export default LocationPanel
