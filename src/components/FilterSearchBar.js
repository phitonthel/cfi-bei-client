export const FilterSearchBar = ({
  filterText,
  onFilter,
  placeholder = "Filter By Text",
}) => (
  <div className="d-flex justify-content-end">
    <input
      id="search"
      type="text"
      placeholder={placeholder}
      aria-label="Search Input"
      className="form-control col-2 ms-auto my-2" // Bootstrap classes for styling and alignment
      value={filterText}
      onChange={onFilter}
    />
  </div>
);

export const filterData = ({
  rows,
  filterKeys,
  searchArr = [],
}) => {
  const filteredRows = rows.filter(item => {
    return filterKeys.some(key =>
      item[key] && searchArr.some(searchItem =>
        item[key].toString().toLowerCase().includes(searchItem.toLowerCase())
      )
    );
  });
  return filteredRows
}