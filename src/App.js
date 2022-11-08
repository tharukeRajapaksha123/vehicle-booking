import { notification } from 'antd';
import './App.css';
import styled from "styled-components"
import { useState } from 'react';
import "antd/dist/antd.css";
import axios from "axios"

const Container = styled.div`
  height : 100vh;
  display:  flex;
`


const Section = styled.div`
  flex : 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #9999ff;
`

const InputField = styled.input`
  flex : 5;
  height: 40px;

`

const InputContainer = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  width: 90%;
  padding: 16px;
  display: flex;
  
  h4{
    flex : 2;
  }
`

const Button = styled.button`
  width : 60%;
  height : 40px;
  border-radius: 6px;
  color : white;
  background-color: lightblue;
  border: none;
  font-weight: bold;
  letter-spacing: 2px;
`

function App() {

  const [name, setCustomerName] = useState("")
  const [nic, setNic] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [address, setAddress] = useState("")
  const [vehicle, setVehicleType] = useState("")


  const createVehicleBooking = async () => {
    if (name !== "" && nic !== "" && mobileNumber !== "" && address !== "" && vehicle !== "") {
      axios.post("http://localhost:8080/transport-controller/create-transport-tour",
        {
          "vehicle_type": vehicle,
          "customer_name": name,
          "location_address": address,
          "mobile_number": mobileNumber,
          "date": Date.now().toString(),
          "employee_id": "asda"
        })
        .then((val) => {

          notification.open({
            message: 'Booking Sucess',
            description:
              'succesfully booking created',
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
        })
        .catch(err => console.log(`creating booking fialed ${err}`))
    } else {
      notification.open({
        message: 'Validation failed',
        description:
          'Please fill the all fields',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    }
  }


  return (
    <Container>
      <Section >
        <img src='https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1200' alt='room' style={{ width: "100%", height: "100%", objectFit: "fill" }} />
      </Section>
      <Section>
        <h1>
          Book Now
        </h1>
        <InputContainer>
          <h4>
            Customer Name
          </h4>
          <InputField
            onChange={(val) => {
              setCustomerName(val.target.value)
            }}
          />
        </InputContainer>
        <InputContainer>
          <h4>
            NIC No
          </h4>
          <InputField
            onChange={(val) => {
              setNic(val.target.value)
            }}
          />
        </InputContainer>
        <InputContainer>
          <h4>
            Mobile Number
          </h4>
          <InputField
            onChange={(val) => {
              setMobileNumber(val.target.value)
            }}
          />
        </InputContainer>
        <InputContainer>
          <h4>
            Address
          </h4>
          <InputField
            onChange={(val) => {
              setAddress(val.target.value)
            }}
          />
        </InputContainer>
        <InputContainer>
          <h4>
            Vehicle Type
          </h4>
          <InputField
            onChange={(val) => {
              setVehicleType(val.target.value)
            }}
          />
        </InputContainer>
        <Button onClick={() => { createVehicleBooking() }}>Save Details</Button>
      </Section>
    </Container>
  );
}

export default App;
