import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

// Function to fetch student names
const fetchStudents = async () => {
  try {
    const response = await fetch('http://50.187.63.220:3306/StudentData'); // Needs to be updated when IP is given
    if (response.ok) {
      const data = await response.json();
      return data.students;
    } else {
      console.error('Failed to fetch student data');
      return [];
    }
  } catch (error) {
    console.error('Error fetching student data:', error);
    return [];
  }
};

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStudents = await fetchStudents();
      setStudents(fetchedStudents);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Student Names:</Text>
      {students.map((student, index) => (
        <Text key={index}>{student.name}</Text>
      ))}
    </View>
  );
};

export { StudentList as default, fetchStudents };
