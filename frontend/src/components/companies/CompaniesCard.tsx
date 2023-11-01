import React from "react";
import CompaniesSingleCard from "./CompaniesSingleCard";

interface CompaniesCardProps {
  companies: Array<object>;
  updateCompanies: () => void;
}

const CompaniesCard = ({ companies, updateCompanies }: CompaniesCardProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {companies.map((item: any) => (
        <CompaniesSingleCard company={item} updateCompanies={updateCompanies} />
      ))}
    </div>
  );
};

export default CompaniesCard;
