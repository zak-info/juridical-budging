"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@heroui/react";

import { useEffect, useState } from "react"
import Vildate from "./Vildate";
import ValidateBudge from "./ValidateBudge";





const Acc = ({ data:Gdata }) => {




  const [data, setData] = useState(Gdata)
  const [condidats, setCondidats] = useState(Gdata)
  const onFilter = (text)=>{
    setCondidats(data?.filter(item => item?.fullname?.toLowerCase().includes(text?.toLowerCase())))
  }

  useEffect(()=>{
    setCondidats(data)
  },[data])



  return (
    <div className=' flex justify-center w-screen h-screen items-center bg-violet-200' >
      <div className="p-4 rounded-3xl bg-white">
        <div className="w-full flex justify-end my-4">
          <ValidateBudge setData={setData} />
        </div>
        <div className="w-full flex justify-start my-4">
          <div className='w-[110px]  px-4 md:w-[300px] h-[51px] mt-4 flex justify-start items-center gap-2 border border-[#E2E8F0] bg-gray-100 rounded-full'>
            <i className="ri-search-line text-xl"></i>
            <input type="text"  onChange={(e) => onFilter(e.target.value)} className='outline-none w-full bg-gray-100 border-none text-[16px] placeholder:text-[16px] placeholder:font-light' placeholder='Type fullname...' />
          </div>
        </div>
        <Table aria-label="Example static collection table" className=" lg:w-[70vw]  ">
          <TableHeader >
            <TableColumn>NAME</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>TYPE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            {/* <TableColumn>Actions</TableColumn> */}
          </TableHeader>
          <TableBody>
            {
              condidats?.map((condidat, index) => (
                <TableRow key={index}>
                  <TableCell>{condidat?.fullname}</TableCell>
                  <TableCell>{condidat?.email}</TableCell>
                  <TableCell>{condidat?.fonction}</TableCell>
                  <TableCell>{condidat?.type}</TableCell>
                  {/* <TableCell>{condidat?.status}</TableCell> */}
                  <TableCell><Chip color="success" variant="flat" >valid</Chip></TableCell>
                  {/* <TableCell><Vildate data={{}} /> </TableCell> */}
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Acc