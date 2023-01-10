import React from "react";
import { Label, Input } from "reactstrap";
import SearchInput from "views/CustomComponents/SearchInput";
import { DEFAULT_QUERY_SIZE } from "helpers/constants";

function TableTop({ handleEntries, handleSearch, resetSearch, placeholder, searchWidth, searchInputFontSize, defaultEntrySize }) {
  
  const mainStyle= {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'end',
    marginBottom: '20px',
    gap: '20px',
  }

  return (
    <div style={mainStyle}>
      <div>
        <Label style={{ fontWeight: 600 }}>Show entries</Label>
        <Input
          className={`shadow-none`}
          id="entries"
          style={{ width: 120 }}
          type="select"
          defaultValue={defaultEntrySize || DEFAULT_QUERY_SIZE}
          onChange={(e) => handleEntries(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Input>
      </div>
      <SearchInput
        changeFunction={handleSearch}
        inputWidth={searchWidth || 260}
        inputFontSize={searchInputFontSize}
        displayText={placeholder || "Search by Order Number"}
        resetSearch={resetSearch}
      />
    </div>
  );
}

export default TableTop;
