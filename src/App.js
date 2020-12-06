import React, { createRef, useState } from 'react';
import './App.css';

const Name = ({
  id,
  info,
  handleFavourite
}) => (
    <li
      className={info.sex}
      onClick={() => handleFavourite(id)}>
      {info.name}
    </li>
  )


const SelectedList = ({
  favourites,
  data,
  deleteFavourite
}) => {
  const hasFavourites = (favourites.length > 0)
  const favList = favourites.map((fav, i) => {
    return (
      <Name
        id={i}
        key={i}
        info={data[fav]}
        handleFavourite={(id) => deleteFavourite(id)}
      />
    )
  })
  return (
    <div className="favourites">
      <h4>
        {hasFavourites
          ? 'Selected Options'
          : 'Click an option to include it..'
        }
      </h4>
      <ul>
        {favList}
      </ul>
      {hasFavourites && <hr />}
    </div>
  )
}


const OptionsList = ({
  data,
  filter,
  favourites,
  addFavourite
}) => {
  const input = filter.toLowerCase()

  // Gather list of names
  const names = data
    // filtering out the names that...
    .filter((person, i) => {
      return (
        // ...are already favourited
        favourites.indexOf(person.id) === -1
        // ...are not matching the current search value
        && !person.name.toLowerCase().indexOf(input)
      )
    })
    // ...output a <Name /> component for each name
    .map((person, i) => {
      // only display names that match current input string
      return (
        <Name
          id={person.id}
          key={i}
          info={person}
          handleFavourite={(id) => addFavourite(id)}
        />
      )
    })

  /* ##### the component's output ##### */
  return (
    <ul>
      {names}
    </ul>
  )
}


const Search = (props) => {
  const filterInput = createRef();
  const { filterVal, filterUpdate } = props;
  return (
    <>
      <form>
        <input
          type='text'
          ref={filterInput}
          placeholder='Type to filter..'
          // binding the input value to state
          value={filterVal}
          onChange={() => {
            filterUpdate(filterInput.current.value)
          }}
        />
      </form>
    </>
  )
}


const App = (props) => {
  const [state, setState] = useState({
    filterText: '',
    favourites: []
  });

  // const [searchBool, setSearch] = useState(false);
  const filterUpdate = (value) => {
    setState({
      ...state,
      filterText: value
    });
  }

  const addFavourite = (id) => {
    const newSet = state.favourites.concat([id])
    setState({
      ...state,
      favourites: newSet
    })
  }

  const deleteFavourite = (id) => {
    const { favourites } = state
    const newList = [
      ...favourites.slice(0, id),
      ...favourites.slice(id + 1)
    ]
    setState({
      ...state,
      favourites: newList
    })
  }

  const hasSearch = state.filterText.length > 0

  return (
    <div>
      <header>

      </header>
      <main>
        <Search
          filterVal={state.filterText}
          filterUpdate={filterUpdate}
        />

        <SelectedList
          data={props.data}
          favourites={state.favourites}
          deleteFavourite={deleteFavourite}
        />
        <div className="wrapper">
          <OptionsList
            data={props.data}
            filter={state.filterText}
            favourites={state.favourites}
            addFavourite={addFavourite}
          />
        </div>

        {/* 
        Show only if user has typed in search.
        To reset the input field, we pass an 
        empty value to the filterUpdate method
      */}
        {hasSearch &&
          <button
            onClick={filterUpdate}>
            Clear Search
        </button>
        }

      </main>
    </div>
  )
}

export default App;




