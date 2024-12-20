import React, { useState, useEffect, ReactNode } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather,MaterialIcons } from '@expo/vector-icons';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams, router } from "expo-router";


// Create Zustand store for hospital views
interface HospitalStore {
  viewedHospitals: Record<string, boolean>;
  addViewedHospital: (hospitalId: string) => void;
  clearViewedHospitals: () => void;
  getViewedCount: () => number;
}

const customPersistStorage = {
  getItem: async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name: string, value: any) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  }
};

const useHospitalStore = create<HospitalStore>()(
  persist(
    (set, get) => ({
      viewedHospitals: {},
      addViewedHospital: (hospitalId) => set((state) => ({
        viewedHospitals: {
          ...state.viewedHospitals,
          [hospitalId]: true
        }
      })),
      clearViewedHospitals: () => set({ viewedHospitals: {} }),
      getViewedCount: () => {
        const { viewedHospitals } = get();
        return Object.keys(viewedHospitals).length;
      }
    }),
    {
      name: 'hospital-storage',
      storage: customPersistStorage,
      onRehydrateStorage: () => {
        return (state) => {
          // Clear viewed hospitals on app launch
          if (state) {
            state.viewedHospitals = {};
          }
        }
      }
    }
  )
);

interface Hospital {
  zip_code: ReactNode;
  city: ReactNode;
  lastUpdated: ReactNode;
  id: string;
  name: string;
  address: string;
  phone: string;
  beds: number;
  icon: string;
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hospitalData, setHospitalData] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true); // Loading state to show the loader
  const { userIdentifier } = useLocalSearchParams();
  const viewedHospitals = useHospitalStore((state) => state.viewedHospitals);
  const addViewedHospital = useHospitalStore((state) => state.addViewedHospital);
  const viewedCount = useHospitalStore((state) => state.getViewedCount());
  const clearViewedHospitals = useHospitalStore((state) => state.clearViewedHospitals);

  useEffect(() => {
    // Fetch hospital data only once
    const fetchHospitalData = async () => {
      try {
        const response = await fetch('http://www.communitybenefitinsight.org/api/get_hospitals.php?state=NC', {
          headers: {
            'x-app-id': '284ccf85',
            'x-app-key': 'e60ca844ee1d9c16dadb248f461c28b0'
          }
        });

        const data = await response.json();
        console.log('Parsed JSON data:', data);

        // Map response to set hospital data
        const hospitals = data.map((item: any) => ({
          id: item.hospital_id,
          name: item.name,
          city: item.city, 
          beds: item.hospital_bed_count, 
          address: item.street_address, 
          zip_code: item.zip_code, 
        }));

        setHospitalData(hospitals);
        setLoading(false); // Set loading to false after data is fetched

      } catch (error) {
        console.error('Error fetching hospital data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchHospitalData(); // This fetch happens only once when component mounts
  }, []);

  const filteredHospitals = hospitalData.filter(hospital => {
    const nameMatch = hospital.name && hospital.name.toLowerCase().includes(searchQuery.toLowerCase());
    const addressMatch = hospital.address && hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || addressMatch;
  });

  const HospitalCard = ({ hospital }: { hospital: Hospital }) => {
    const isViewed = viewedHospitals[hospital.id];

    const handleViewMore = () => {
      if (!isViewed) {
        addViewedHospital(hospital.id);
      }
    };

    
    return (
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          {/* Display hospital icon */}
          <Image
            source={require('../../../assets/images/hospital.webp')} // Path to the local image
            style={styles.hospitalIcon}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.hospitalName}>{hospital.name}</Text>
          <Text style={styles.hospitalDetail}>
            <Text style={styles.detailLabel}>City: </Text>
            {hospital.city}
          </Text>
          <Text style={styles.hospitalDetail}>
            <Text style={styles.detailLabel}>Address: </Text>
            {hospital.address}
          </Text>
          <Text style={styles.hospitalDetail}>
            <Text style={styles.detailLabel}>Beds: </Text>
            {hospital.beds}
          </Text>
          
          {/* Display Zip Code and View Button on the same line */}
          <View style={styles.bedsAndButtonContainer}>
            <Text style={styles.hospitalDetail}>
              <Text style={styles.detailLabel}>Zip Code: </Text>
              {hospital.zip_code}
            </Text>

            <TouchableOpacity
              style={[styles.viewMoreButton, isViewed && styles.viewedButton]}
              onPress={handleViewMore}
            >
              <Text style={styles.viewMoreText}>
                {isViewed ? 'Viewed' : 'View'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const handleLogout = () => {
    router.replace("/login");
  };

  const handleRefresh = () => {
    clearViewedHospitals();
  };
  

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.welcomeContainer}>
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <MaterialIcons name="refresh" size={28} color="#0BA787" />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.userIdentifierText}>{userIdentifier}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color="#0BA787" />
        </TouchableOpacity>
      </View>
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
        <View style={styles.viewedCountContainer}>
          <Text style={styles.viewedCountText}>Viewed: {viewedCount}</Text>
        </View>
      </View>

      {/* Show loader while data is being fetched */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0BA787" />
        </View>
      ) : (
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredHospitals.map(hospital => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15
  },
  refreshButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 30,
    marginVertical: 5,
    fontWeight: "bold",
    textAlign: 'center',
  },
  userIdentifierText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0BA787",
    textAlign: 'center',
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
    padding: 10,
  },
  searchContainer: {
    marginTop: 15,
    marginVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10
  },
  viewedCountContainer: {
    backgroundColor: '#0BA787',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  viewedCountText: {
    color: 'white',
    fontWeight: 'bold'
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
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
    marginTop: -8,
    alignItems: 'center',
    justifyContent: 'space-between',  // Ensure the button is aligned to the right
    alignSelf: 'stretch'
  },
  hospitalName: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  hospitalDetail: {
    fontSize: 14,
    color: '#7f8c8d'
  },
  detailLabel: {
    fontWeight: 'bold'
  },
  viewMoreButton: {
    backgroundColor: '#0BA787',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  viewedButton: {
    backgroundColor: '#7f8c8d',
  },
  viewMoreText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default Home;
