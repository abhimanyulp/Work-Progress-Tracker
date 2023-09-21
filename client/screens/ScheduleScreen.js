import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, Button } from 'react-native';
import { API_BASE_URL } from '../config';

const ScheduleScreen = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showPercentage, setShowPercentage] = useState(false); // State to control percentage visibility

  const fetchScheduleData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/schedule?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      setScheduleData(data);
      setShowPercentage(true); // Show percentage after data is fetched
    } catch (error) {
      console.error('Error fetching schedule data:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsComplete = (activityId) => {
    const updatedData = scheduleData.map((activity) => {
      if (activity._id === activityId) {
        return { ...activity, completed: true };
      }
      return activity;
    });
    setScheduleData(updatedData);
  };

  const calculateCompletionPercentage = () => {
    const totalActivities = scheduleData.length;
    const completedActivities = scheduleData.filter((activity) => activity.completed).length;
    return ((completedActivities / totalActivities) * 100).toFixed(2);
  };

  return (
    <View>
      {showPercentage && (
        <Text>Percentage of Completed Activities: {calculateCompletionPercentage()}%</Text>
      )}
      <Text>Schedule Data</Text>
      
      <TextInput
        placeholder="Start Date (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        placeholder="End Date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
      />
      
      <Button
        title="Submit Date Range"
        onPress={fetchScheduleData}
        disabled={!startDate || !endDate}
      />
      
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={scheduleData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.activityName}</Text>
              <Text>Start Date: {item.startDate}</Text>
              <Text>End Date: {item.endDate}</Text>
              {item.completed ? (
                <Text>Completed</Text>
              ) : (
                <Button
                  title="Mark as Complete"
                  onPress={() => markAsComplete(item._id)}
                />
              )}
              {/* Add more fields as needed */}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ScheduleScreen;
