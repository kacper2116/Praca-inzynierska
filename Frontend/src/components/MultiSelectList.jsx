import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchParams, setSearchParams, useParams } from "react-router-dom";

const MultiSelectList = ({ name, listItems, functionSetFilter }) => {

  const { param } = useParams();
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedItems, setSelectedItems] = useState();
  const [hideSelectList, setHideSelectList] = useState(false)

 

  useEffect(() => {

    if (listItems.includes(param)) {
      setHideSelectList(true)
      console.log(listItems)
    }else setHideSelectList(false)

  }, [param])

  const options = listItems.map(item => ({ value: item, label: item }));

  useEffect(() => {

    if (searchParams.getAll(name).length > 0) {

      const data = JSON.parse(searchParams.getAll(name))

      const selectedItemsFromUrl = data.map(item => ({ value: item, label: item }));
      setSelectedItems(selectedItemsFromUrl)

    }


  }, [])

  const handleSelectChange = (selectedOptions) => {
    setSelectedItems(selectedOptions);

    const values = selectedOptions.map((option) => option.value)

    if (functionSetFilter) {
      functionSetFilter(name, values)

    }

  };

  const MultiValueRemove = ({ innerProps }) => {

    return (
      <div {...innerProps} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <FaTimes style={{ marginLeft: '4px' }} />
      </div>
    );
  };


  if (!hideSelectList) {

    return (


      <div>

        <label htmlFor="MultiSelectList"><h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2></label>
        <Select

          id="MultiSelectList"
          name={name}
          value={selectedItems}
          onChange={handleSelectChange}
          options={options}
          isSearchable={false}
          isMulti
          components={{ MultiValueRemove }}
          menuMaxHeight={250}

        />

      </div>
    );

  }



};

export default MultiSelectList