import styled from "styled-components";
import { apiGetAllOrderDetails } from "../RestApi";
import { useEffect, useState } from "react";

export function AdminPaymentManage() {
  useEffect(() => {
    apiGetAllOrderDetails()
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("'Error fetching purchase data: ", error);
      });
  }, []);
  return (
    <>
      <p>수강/결제 관리</p>
    </>
  );
}
