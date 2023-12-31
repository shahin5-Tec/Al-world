import React, { useEffect, useState } from "react";
import SingleData from "../Singledata/SingleData";
import Button from "../Button/button";
import Modal from "../Modal/Modal";

const Card = () => {
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [uniqeId, setUniqeId] = useState(null);


  const handleShowAll = () => {
    setShowAll(true);
  };
  const handleSort=()=>{
   const sortedData =data.sort((a,b)=>{
    return new Date(a.published_in) - new Date(b.published_in)
  });
  setData([...data,sortedData]);
  };
  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/ai/tools")
      .then((res) => res.json())
      .then((data) => setData(data.data.tools));
  }, []);

  useEffect(() => {
    fetch(` https://openapi.programming-hero.com/api/ai/tool/${uniqeId}`)
      .then((res) => res.json())
      .then((data) => setSingleData(data.data));
  }, [uniqeId]);
  // console.log(data.data);

  return (
    <>
      <span onClick={handleSort}>
        <Button>Sort By date</Button>
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
        {data.slice(0, showAll ? 12 : 6).map((singleData) => (
          <SingleData
            key={singleData.id}
            singleData={singleData}
            setUniqeId={setUniqeId}
          ></SingleData>
        ))}
      </div>
      {!showAll && (
        <span onClick={handleShowAll}>
          <Button>See More</Button>
        </span>
      )}
      <Modal singleData={singleData}></Modal>
    </>
  );
};

export default Card;
