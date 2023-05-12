import React, { useState } from "react";
import idCardsData from "./idCards.json";
import "./idCards.json";
import "./IDCardList.css";

const IDCardList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [idCardsPerPage] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    domain: "",
    gender: "",
    availability: "",
  });
  const [team, setTeam] = useState([]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, filterValue) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [filterType]: filterValue,
    }));
    setCurrentPage(1);
  };

  const applyFilters = (idCard) => {
    const { domain, gender, availability } = filterOptions;
    if (
      (domain && idCard.domain !== domain) ||
      (gender && idCard.gender !== gender) ||
      (availability && idCard.availability !== availability)
    ) {
      return false;
    }
    return true;
  };

  const addToTeam = (idCard) => {
    const uniqueDomains = team.map((member) => member.domain);

    if (!uniqueDomains.includes(idCard.domain)) {
      setTeam((prevTeam) => [...prevTeam, idCard]);
      addToTeam();
    }
  };

  const removeFromTeam = (idCard) => {
    setTeam((prevTeam) => prevTeam.filter((member) => member.id !== idCard.id));
    removeFromTeam();
  };

  const filteredIDCards = idCardsData.filter(
    (idCard) =>
      idCard.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      applyFilters(idCard)
  );

  const indexOfLastIDCard = currentPage * idCardsPerPage;
  const indexOfFirstIDCard = indexOfLastIDCard - idCardsPerPage;
  const currentIDCards = filteredIDCards.slice(
    indexOfFirstIDCard,
    indexOfLastIDCard
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="id-card-list">
      <h1>ID Card List</h1>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by name"
      />

      <div className="filters">
        <label>
          Domain:
          <select
            value={filterOptions.domain}
            onChange={(e) => handleFilterChange("domain", e.target.value)}
          >
            <option value="">All</option>
            <option value="Domain 1">Domain 1</option>
            <option value="Domain 2">Domain 2</option>
          </select>
        </label>

        <label>
          Gender:
          <select
            value={filterOptions.gender}
            onChange={(e) => handleFilterChange("gender", e.target.value)}
          ></select>
        </label>
      </div>
    </div>
  );
};

export default IDCardList;
