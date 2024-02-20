import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Img = styled.img`
   width: 10%;
`;

export function Course() {
   const [courses, setCourses] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(
               "http://localhost:8080/api/course",
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            );
            setCourses(response.data);
         } catch (error) {
            console.error("Error fetching courses:", error);
         }
      };

      fetchData();
   }, []);

   return (
      <div>
         <h1>Course List</h1>
         <ul>
            {courses.map((course) => (
               <li key={course.courseId}>
                  <h2>{course.courseName}</h2>
                  <p>Description: {course.description}</p>
                  <p>Duration: {course.durationMins} minutes</p>
                  <p>Content Level: {course.contentLevel}</p>
                  <p>Price: {course.price} 원</p>
                  <p>Announcement: {course.announcement}</p>
                  {course.courseThumbnail ? (
                     <Img
                        src={
                           "https://cdn.discordapp.com/attachments/1171612006873313435/1197799974562435135/750.jpg?ex=65bc9527&is=65aa2027&hm=53b241cb63fa04e039486c11b9f4d9330544822ca68b2129f1fd6b3c93864e73&"
                        }
                        // src={base64ToDataURL(course.courseThumbnail)}
                        // alt="Course Thumbnail"
                        // // style={{ maxWidth: "100%" }}
                        // onLoad={() => console.log("Image loaded successfully")}
                        // onError={(e) => console.error("Image load error:", e.message)}
                     />
                  ) : (
                     <p>No thumbnail available</p>
                  )}
               </li>
            ))}
         </ul>
      </div>
   );
}
