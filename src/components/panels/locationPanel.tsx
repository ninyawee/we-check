import { FC, Fragment, useState } from "react"
import BottomDrawer from "../drawers/bottomDrawer"
import LocationUnitsList from "@/src/components/locationUnitsList"
import VolunteerRegisterForm from "../forms/volunteerRegisterForm.tsx"
import UnitInfoForm from "@/src/components/forms/unitInfoForm"
import { useMediaQuery } from "@mui/material"
import { useLayoutStore } from "@/src/store/layout.store"
import { useUnitDataStore } from "@/src/store/UnitData.store"

enum LocationFormState {
  Location,
  Register
}

const LocationPanel: FC<{
  open: boolean,
  onClose: () => void
}> = ({ open, onClose }) => {
  const [currentState, setCurrentState] = useState<LocationFormState>(LocationFormState.Location)
  const { openUnitInfoForm, setOpenUnitInfoForm, setSelectedUnitData } = useUnitDataStore()
  function handleRegisterClick() {
    setCurrentState(LocationFormState.Register)
  }

  function handleBackToLocationClick() {
    setCurrentState(LocationFormState.Location)
  }

  function handleClose() {
    // ensure unit form is closed and selection cleared when the drawer closes
    try {
      setOpenUnitInfoForm(false)
      setSelectedUnitData(null as any)
    } catch (e) {
      // ignore
    }

    onClose()
  }

  return <Fragment>
    {
      <BottomDrawer open={open} onClose={handleClose}>
        {openUnitInfoForm ? (
          <UnitInfoForm />
        ) : (
          <>
            {currentState === LocationFormState.Location && <LocationUnitsList />}
            {currentState === LocationFormState.Register && (
              <VolunteerRegisterForm onBackToLocation={handleBackToLocationClick} />
            )}
          </>
        )}
      </BottomDrawer>
    }
  </Fragment>
}

export default LocationPanel
