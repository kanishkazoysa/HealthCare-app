import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

// Dummy hospital data
const hospitalData = [
  {
    id: '1',
    name: 'City Central Hospital',
    address: '123 Main St, New York, USA',
    phone: '+1 (555) 123-4567',
    beds: 250,
    icon: require('../../../assets/images/hospital.webp')
  },
  {
    id: '2',
    name: 'Riverside Medical Center',
    address: '456 River Road, Chicago, USA',
    phone: '+1 (555) 987-6543',
    beds: 350,
    icon: require('../../../assets/images/hospital.webp')
  },
  {
    id: '3',
    name: 'Metropolitan General',
    address: '789 Urban Avenue, Los Angeles, USA',
    phone: '+1 (555) 246-8135',
    beds: 400,
    icon: require('../../../assets/images/hospital.webp')
  },
  {
    id: '4',
    name: 'Green Valley Hospital',
    address: '321 Hill Street, San Francisco, USA',
    phone: '+1 (555) 369-2580',
    beds: 200,
    icon: require('../../../assets/images/hospital.webp')
  }
];

interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  beds: number;
  icon: any;
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter hospitals based on search query
  const filteredHospitals = hospitalData.filter(hospital => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const HospitalCard = ({ hospital }: { hospital: Hospital }) => {
    const handleViewMore = () => {
      // Implement navigation or modal to show more hospital details
      console.log(`View more details for ${hospital.name}`);
    };

    return (
      <View style={styles.card}>
        {/* Hospital Icon - 30% width */}
        <View style={styles.iconContainer}>
          <Image 
            source={hospital.icon} 
            style={styles.hospitalIcon} 
            resizeMode="contain"
          />
        </View>

        {/* Hospital Details - 70% width */}
        <View style={styles.detailsContainer}>
          <Text style={styles.hospitalName}>{hospital.name}</Text>
          <Text style={styles.hospitalDetail}>
            <Text style={styles.detailLabel}>Address: </Text>
            {hospital.address}
          </Text>
          <Text style={styles.hospitalDetail}>
            <Text style={styles.detailLabel}>Phone: </Text>
            {hospital.phone}
          </Text>
          <View style={styles.bedsAndButtonContainer}>
            <Text style={styles.hospitalDetail}>
              <Text style={styles.detailLabel}>Beds: </Text>
              {hospital.beds}
            </Text>

            {/* View More Button */}
            <TouchableOpacity 
              style={styles.viewMoreButton} 
              onPress={handleViewMore}
            >
              <Text style={styles.viewMoreText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar with Icon */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather 
            name="search" 
            size={20} 
            color="#888" 
            style={styles.searchIcon} 
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search hospitals..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Hospital Cards Scrollview */}
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredHospitals.map(hospital => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15
  },
  searchContainer: {
    marginTop: -45,
    marginVertical: 15,
    paddingHorizontal: 10
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingRight: 15
  },
  scrollViewContent: {
    paddingBottom: 20
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 140
  },
  iconContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0'
  },
  hospitalIcon: {
    width: '80%',
    height: '80%'
  },
  detailsContainer: {
    width: '70%',
    padding: 15,
    justifyContent: 'center'
  },
  bedsAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  hospitalDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#333'
  },
  viewMoreButton: {
    backgroundColor: '#0BA787',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  viewMoreText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  }
});

export default Home;