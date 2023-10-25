import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BACKEND_URL } from "../../../config";
import axios from "axios";
import { useSnackbar } from "notistack";
import Spinner from "../Spinner";

const CompanyModal = ({ companyId, updateCompanies, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteCompany = () => {
    setLoading(true);
    axios
      .delete(BACKEND_URL + `/companies/${companyId}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Company deleted successfully!", {
          variant: "success",
        });
        updateCompanies();
        onClose();
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting company!", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      {/* stopPropagation() prevents the modal to close when user clicks inside the Modal but it closes when user clicks outside of the modal. */}
      {/* The click event will not bubble up to the parent elements where is a click event handler */}
      {/* https://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[240px] bg-white rounded-xl p-4 flex flex-col items-center relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />

        {loading ? <Spinner /> : ""}
        <div className="flex flex-col items-center rounded-xl w-[500px] p-8 mx-auto">
          <h3 className="text-2xl">
            Are you sure you want to delete this company?
          </h3>
          <button
            className="p-4 bg-red-600 text-white m-8 w-full"
            onClick={handleDeleteCompany}
          >
            Yes, delete it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
