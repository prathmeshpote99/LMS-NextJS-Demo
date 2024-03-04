import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Select from 'react-select'
import { Label } from 'reactstrap'

// import { getAllCircuit } from "helpers/backendHelpers/area"
// import { defaultRDCSeparator } from 'helpers/common_helper_functions'
import { getAllArea } from './backendHelpers/area'
import { defaultRDCSeparator } from './common'
const RegionDistrictCircuitDropDownAllSelectable = ({
  isRequired,
  hasTouched,
  hasErrors,
  fieldName,
  areaValue,
  setFieldValue,
  setFieldTouched,
  regionSelectDisabled,
  districtSelectDisabled,
  circuitSelectDisabled,
  areaChange,
  showLabel = true,
  isStyled,
  className,
  handleFormValueChange,
}) => {
  const [allAreas, setAllAreas] = useState([])

  useEffect(() => {
    prepareRDCDDOptions()
  }, [])

  const prepareRDCDDOptions = async () => {
    try {
      let { data } = await getAllArea()
      // console.log('regionData', data)
      let { circuits } = data || {}
      circuits = circuits || []

      let tempAreas = []

      for (let reg of circuits) {
        let { regionTitle, district } = reg

        let value =
          (regionTitle || '') +
          defaultRDCSeparator +
          '' +
          defaultRDCSeparator +
          ''
        // tempAreas.push({
        //   value,
        //   label: regionTitle,
        //   isDisabled: !!regionSelectDisabled,
        // })

        for (let dist of district) {
          let { districtTitle, circuit } = dist

          let value =
            (regionTitle || '') +
            defaultRDCSeparator +
            (districtTitle || '') +
            defaultRDCSeparator +
            ''
          let label = `${regionTitle}, ${districtTitle}`
          tempAreas.push({
            value,
            label,
            isDisabled: !!districtSelectDisabled,
          })

          for (let circ of circuit) {
            let { circuitTitle } = circ

            let value =
              (regionTitle || '') +
              defaultRDCSeparator +
              (districtTitle || '') +
              defaultRDCSeparator +
              (circuitTitle || '')
            let label = `${regionTitle}, ${districtTitle}, ${circuitTitle}`
            // tempAreas.push({
            //   value,
            //   label,
            //   isDisabled: !!circuitSelectDisabled,
            // })
          }
        }
      }
      // console.log('tempAreas12', tempAreas)
      setAllAreas(
        tempAreas.sort((a, b) =>
          a.label < b.label ? -1 : a.label > b.label ? 1 : 0,
        ),
      )
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        'There was a problem fetching regions'
      setAllAreas([])
      // return SaveToast({ message, type: 'error' })
    }
  }

  return (
    <>
      {showLabel && (
        <Label className="form-label">
          Region - District{' '}
          {isRequired && <span className="text-danger">*</span>}
        </Label>
      )}
      <Select
        className={isStyled ? className : ''}
        name={fieldName}
        placeholder="Region - District"
        value={allAreas.find((value) => value.value === areaValue)}
        onChange={(value) => {
          handleFormValueChange && handleFormValueChange(value)
          setFieldValue(fieldName, value ? value.value : '')
          if (areaChange) {
            areaChange(value.value)
          }
        }}
        onBlur={(evt) => {
          setFieldTouched(fieldName, true)
        }}
        options={allAreas}
        isClearable
        invalid={hasTouched && hasErrors}
      />
      {hasTouched && hasErrors && (
        <div className="invalid-react-select-dropdown">{hasErrors}</div>
      )}
    </>
  )
}

RegionDistrictCircuitDropDownAllSelectable.propTypes = {
  isRequired: PropTypes.bool,
  hasTouched: PropTypes.bool || false,
  hasErrors: PropTypes.string || '',
  fieldName: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  regionSelectDisabled: PropTypes.bool,
  districtSelectDisabled: PropTypes.bool,
  circuitSelectDisabled: PropTypes.bool,
  areaChange: PropTypes.func,
}

RegionDistrictCircuitDropDownAllSelectable.defaultProps = {
  isRequired: true,
  fieldName: 'region',
  regionSelectDisabled: false,
  districtSelectDisabled: false,
  circuitSelectDisabled: false,
}

export default RegionDistrictCircuitDropDownAllSelectable
