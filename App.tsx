import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button, Linking, TextStyle,TouchableOpacity, TextInput, SafeAreaView, ScrollView, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { NativeStackNavigationProp} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {Animated} from 'react-native'
import {useRef, useEffect} from 'react';
import { Picker } from '@react-native-picker/picker';



const Stack= createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} 
        />
         <Stack.Screen name="StarterScreen" component={StarterScreen} 
        />
      <Stack.Screen name="MainScreen" component={MainsScreen}
      />
       <Stack.Screen name="DessertScreen" component={DessertScreen}
      />
       
      </Stack.Navigator>
    </NavigationContainer>
  )
}
function HomeScreen({navigation}){
  const [Starters, setStarter] = useState('');
  const [Mains, setMains] = useState('');
  const [Desserts, setDesserts] = useState('');
  const [expanded, setStarterExpanded] = useState(false);
  const [Description, setStarterDescription] = useState('');
  const [Dish, setStarterDish] = useState('');
  const [Price, setStarterPrice] = useState('');
  const [MainDescription, setMainDescription] = useState('');
  const [MainDish, setMainDish] = useState('');
  const [MainPrice, setMainPrice] = useState('');
  const [DessertDescription, setDessertDescription] = useState('');
  const [DessertDish, setDessertDish] = useState('');
  const [DessertPrice, setDessertPrice] = useState('');
  const [Mainexpanded, setMainExpanded] = useState(false);
  const [Dessertexpanded, setDessertExpanded] = useState(false);
  const animation = useRef(new Animated.Value(100)).current; // starting height
  const [fadeAnim] = useState(new Animated.Value(0));
  const [collapsed, setCollapsed] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | ''>('');
  
  const [input, setInput]=useState('');
  const [message, setMessage]=useState('');
const [dish, setDishes]=useState<Dish[]>([]);
const [course, setCourse] = useState<Course | ''>('');
  const [selectedValue, setSelectedValue] = useState<string>('java');


  const onValueChange = (value: string) => {
    setSelectedValue(value);
    setStarterExpanded(true); 
    setMainExpanded(true);
    setDessertExpanded(true);// show the box when value is selected
  };



  const toggleCollapse = () => {
    Animated.timing(animation, {
      toValue: collapsed ? 100 : 0, // toggle between 100 and 0
      duration: 30,
      useNativeDriver: false,
    }).start();
    setCollapsed(!collapsed);
  };
  
 
  type Course= 'Mains' | 'Starter' | 'Desserts';

  interface Dish{
  Dish:string;
  Description:string;
  Price:string;
  course:Course;
  MainDish:string;
  MainDescription:string;
  MainPrice:string;
  }

  const handleAddItems=()=>{
    if (!selectedCourse) {
      setMessage('Please select a course first.');
      return;
    }
    if (!selectedCourse || !Dish.trim() || !Description.trim() || !Price.trim()){
      setMessage('Please add a dish!');
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setMessage(''));
      }, 3000);
      return;
    }

    const newDish: Dish = {
      Dish: Dish.trim(),
      Description: Description.trim(),
      Price: Price.trim(),
      course: selectedCourse,
    };

    console.log('Adding new dish:', newDish);
  

    setDishes((prev) => [...prev, newDish]);
    setMessage(` ${Dish} has been added to the ${selectedCourse} menu.`);
    // Clear inputs
    setStarterDish('');
    setStarterDescription('');
    setStarterPrice('');
    setCourse('');

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();




    setTimeout(() => {
      setMessage('');
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMessage('')); // when fade-out finishes, clear message
    }, 3000);
  };

  
  const countByCourse=(course: Course): number =>{
    console.log(`Counting dishes for ${course}:`, dish.filter((dish) => dish.course === course));
     return dish.filter((dish) => dish.course === course).length;
  };



   


  

  
  



  return(
    
<View style={styles.container}>
  <View style={styles.box}>
  <Text style={{fontWeight:'bold',fontFamily:'serif', color:'white',padding: 20, fontSize:35, justifyContent:'center',textAlign:'center',}}>Menu</Text>
  <StatusBar backgroundColor='#4D8A8B'/>
  </View>
 

    <View>
    
        <Text style={{fontWeight:'bold',fontFamily:'serif', textAlign:'center',justifyContent:'center',fontSize:25, color:'#44201C'}}>Courses </Text>
<View style={styles.pickerBox}>
<Picker
        selectedValue={selectedCourse}
        onValueChange={(value) => setSelectedCourse(value as Course)}
        style={styles.picker}
      >
 <Picker.Item label="-- Choose a course --" value="" />       
<Picker.Item label="Starter" value="Starter"/>
<Picker.Item label="Mains" value="Mains"/>
<Picker.Item label="Desserts" value="Desserts"/>
    </Picker>   
</View>
</View>
     
      {['Mains', 'Starter', 'Desserts'].includes(selectedCourse) && (
        <TouchableOpacity>
          <View style={styles.expandedBox}>
          <TextInput
            style={styles.InputBoxs}
            placeholder="Enter Dish Name"
            value={Dish}
            onChangeText={setStarterDish}
          />
          <TextInput
            style={styles.InputBoxs}
            placeholder="Enter Description"
            value={Description}
            onChangeText={setStarterDescription}
          />
          <TextInput
            style={styles.InputBoxs}
            placeholder="Enter Price"
            value={Price}
            onChangeText={setStarterPrice}
            keyboardType="numeric"
          />
          <Button title="Add Dish" color={'#44201C'} onPress={handleAddItems} />
          </View>
          </TouchableOpacity>
      
      )}
 {message.length > 0 && <Text style= {styles.message}>{message}</Text>}
 
 {/* didplay total number of dishes */}
 <View style={styles.courseCount}>
  <Text>Total number of dishes:</Text>
        <Text>Starter: {countByCourse('Starter')}</Text>
        <Text>Mains: {countByCourse('Mains')}</Text>
        <Text>Desserts: {countByCourse('Desserts')}</Text>
      </View>
    </View>



  );
};


function StarterScreen({navigation}){
  const [Description, setStarterDescription] = useState('');
  const [Dish, setStarterDish] = useState('');
  const [Price, setStarterPrice] = useState('');

  return(
<View style={styles.container}>
  <View style={styles.box}>
    <Text style={{fontWeight:'bold', fontFamily:'serif', color:'white',padding: 20, fontSize:35, justifyContent:'center',textAlign:'center',}}>Starters</Text>
  </View>
  <View style={styles.Starterspacer}>
  </View>
  <View style={styles.StarterDishbox}>
      
       <TextInput style={styles.InputBoxs}
       placeholder='Enter Dish Name'
       onChangeText={newText=> setStarterDish(newText)}/>
     </View>

      <View style={styles.Starterspacer}>
      </View>

      <View style={styles.StarterDescriptionBox}>
       <TextInput style={styles.InputBoxs}
       placeholder='Enter description' 
       onChangeText={newText=> setStarterDescription(newText)}/>
      </View>
      <View style={styles.Starterspacer}>
      </View>
      
      <View style={styles.StarterPriceBox}>
      <TextInput style={styles.InputBoxs}
       placeholder='Enter price' 
       onChangeText={newText=> setStarterPrice(newText)}/>
       </View>
      
      <View style={styles.Starterspacer}>
      </View>

  <View style={styles.StarterDishbox}>
      
       <TextInput style={styles.InputBoxs}
       placeholder='Enter Dish Name'
       onChangeText={newText=> setStarterDish(newText)}/>
     </View>

      <View style={styles.Starterspacer}>
      </View>

      <View style={styles.StarterDescriptionBox}>
       <TextInput style={styles.InputBoxs}
       placeholder='Enter description' 
       onChangeText={newText=> setStarterDescription(newText)}/>
      </View>
      <View style={styles.Starterspacer}>
      </View>
      
      <View style={styles.StarterPriceBox}>
      <TextInput style={styles.InputBoxs}
       placeholder='Enter price' 
       onChangeText={newText=> setStarterPrice(newText)}/>
       </View>
      
      <View style={styles.Starterspacer}>
      </View>
      <View style={styles.StarterDishbox}>
      
       <TextInput style={styles.InputBoxs}
       placeholder='Enter Dish Name'
       onChangeText={newText=> setStarterDish(newText)}/>
     </View>

      <View style={styles.Starterspacer}>
      </View>

      <View style={styles.StarterDescriptionBox}>
       <TextInput style={styles.InputBoxs}
       placeholder='Enter description' 
       onChangeText={newText=> setStarterDescription(newText)}/>
      </View>
      <View style={styles.Starterspacer}>
      </View>
      
      <View style={styles.StarterPriceBox}>
      <TextInput style={styles.InputBoxs}
       placeholder='Enter price' 
       onChangeText={newText=> setStarterPrice(newText)}/>
       </View>
      
      <View style={styles.Starterspacer}>
      </View>
      
      <Button title='MainsScreen'
      color='#C5C0AA'
      onPress={()=> navigation.navigate('MainScreen')}/>
      

</View>
    
  );
};

function MainsScreen({navigation}){
  const [Description, setMainDescription] = useState('');
  const [Dish, setMainDish] = useState('');
  const [Price, setMainPrice] = useState('');



  return(
<View style={styles.container}>
  <View style={styles.box}>
    <Text style={{fontWeight:'bold', fontFamily:'serif', color:'white',padding: 20, fontSize:35, justifyContent:'center',textAlign:'center',}}>Starters</Text>
  </View>
  <View style={styles.Mainspacer}>
  </View>
  <View style={styles.MainDishbox}>
      
       <TextInput style={styles.InputBoxs}
       placeholder='Enter Dish Name'
       onChangeText={newText=> setMainDish(newText)}/>
     </View>

      <View style={styles.Mainspacer}>
      </View>

      <View style={styles.StarterDescriptionBox}>
       <TextInput style={styles.InputBoxs}
       placeholder='Enter description' 
       onChangeText={newText=> setMainDescription(newText)}/>
      </View>
      <View style={styles.Starterspacer}>
      </View>
      
      <View style={styles.MainPriceBox}>
      <TextInput style={styles.InputBoxs}
       placeholder='Enter price' 
       onChangeText={newText=> setMainPrice(newText)}/>
       </View>
      
      <View style={styles.Mainspacer}>
      </View>

  <View style={styles.MainDishbox}>
      
       <TextInput style={styles.InputBoxs}
       placeholder='Enter Dish Name'
       onChangeText={newText=> setMainDish(newText)}/>
     </View>

      <View style={styles.Mainspacer}>
      </View>

      <View style={styles.MainDescriptionBox}>
       <TextInput style={styles.InputBoxs}
       placeholder='Enter description' 
       onChangeText={newText=> setMainDescription(newText)}/>
      </View>
      <View style={styles.Mainspacer}>
      </View>
      
      <View style={styles.MainPriceBox}>
      <TextInput style={styles.InputBoxs}
       placeholder='Enter price' 
       onChangeText={newText=> setMainPrice(newText)}/>
       </View>
      
      <View style={styles.Mainspacer}>
      </View>
      <View style={styles.MainDishbox}>
      
       <TextInput style={styles.InputBoxs}
       placeholder='Enter Dish Name'
       onChangeText={newText=> setMainDish(newText)}/>
     </View>

      <View style={styles.Mainspacer}>
      </View>

      <View style={styles.MainDescriptionBox}>
       <TextInput style={styles.InputBoxs}
       placeholder='Enter description' 
       onChangeText={newText=> setMainDescription(newText)}/>
      </View>
      <View style={styles.Mainspacer}>
      </View>
      
      <View style={styles.MainPriceBox}>
      <TextInput style={styles.InputBoxs}
       placeholder='Enter price' 
       onChangeText={newText=> setMainPrice(newText)}/>
       </View>
      
      <View style={styles.Starterspacer}>
      </View>
      
      <Button title='DessertScreen'
      color='#C5C0AA'
      onPress={()=> navigation.navigate('DessertScreen')}/>
      

</View>
    
  );
};

function DessertScreen({navigation}){
  const [Description, setDessertDescription] = useState('');
  const [Dish, setDessertDish] = useState('');
  const [Price, setDessertPrice] = useState('');

  return(
    <View style={styles.container}>
  <View style={styles.box}>
    <Text style={{fontWeight:'bold', fontFamily:'serif', color:'white',padding: 20, fontSize:35, justifyContent:'center',textAlign:'center',}}>Starters</Text>
  </View>
  <View style={styles.Mainspacer}>
  </View>

  <View style={styles.MainDishbox}>
      
       <TextInput style={styles.InputBoxs}
       placeholder='Enter Dish Name'
       onChangeText={newText=> setDessertDish(newText)}/>
     </View>

      <View style={styles.Mainspacer}>
      </View>

      <View style={styles.StarterDescriptionBox}>
       <TextInput style={styles.InputBoxs}
       placeholder='Enter description' 
       onChangeText={newText=> setDessertDescription(newText)}/>
      </View>
      <View style={styles.Starterspacer}>
      </View>
      
      <View style={styles.MainPriceBox}>
      <TextInput style={styles.InputBoxs}
       placeholder='Enter price' 
       onChangeText={newText=> setDessertPrice(newText)}/>
       </View>
      
      <View style={styles.Mainspacer}>
      </View>

  <View style={styles.MainDishbox}>
      
       <TextInput style={styles.InputBoxs}
       placeholder='Enter Dish Name'
       onChangeText={newText=> setDessertDish(newText)}/>
     </View>

      <View style={styles.Mainspacer}>
      </View>

      <View style={styles.MainDescriptionBox}>
       <TextInput style={styles.InputBoxs}
       placeholder='Enter description' 
       onChangeText={newText=> setDessertDescription(newText)}/>
      </View>
      <View style={styles.Mainspacer}>
      </View>
      
      <View style={styles.MainPriceBox}>
      <TextInput style={styles.InputBoxs}
       placeholder='Enter price' 
       onChangeText={newText=> setDessertPrice(newText)}/>
       </View>
      
      <View style={styles.Mainspacer}>
      </View>
      <View style={styles.MainDishbox}>
      
       <TextInput style={styles.InputBoxs}
       placeholder='Enter Dish Name'
       onChangeText={newText=> setDessertDish(newText)}/>
     </View>

      <View style={styles.Mainspacer}>
      </View>

      <View style={styles.MainDescriptionBox}>
       <TextInput style={styles.InputBoxs}
       placeholder='Enter description' 
       onChangeText={newText=> setDessertDescription(newText)}/>
      </View>
      <View style={styles.Mainspacer}>
      </View>
      
      <View style={styles.MainPriceBox}>
      <TextInput style={styles.InputBoxs}
       placeholder='Enter price' 
       onChangeText={newText=> setDessertPrice(newText)}/>
       </View>
      
      <View style={styles.Starterspacer}>
      </View>
      
      <Button title='Add Items Screen'
      color='#C5C0AA'
      onPress={()=> navigation.navigate('DessertScreen')}/>
      

</View>

  );
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box:{
    width:600,
    height:80,
    backgroundColor:'#C5C0AA',
    justifyContent:'center',
    alignItems: 'center',
    textAlign:'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    
  },
  Startersbox:{
    width:600,
    height:100,
    backgroundColor:'#C5C0AA',
    justifyContent:'center',
    alignItems: 'center',
    textAlign:'center',
   
    
  },
  Menuspacer:{
    height: 20, // this will create space between the boxes
  },
  StarterText:{
color: 'white',
fontSize: 25,
fontWeight: 'bold',
fontFamily: 'sans-serif',
  },
  Dessertbox:{
    width:600,
    height:100,
    backgroundColor:'C5C0AA#',
    justifyContent:'center',
    alignItems: 'center',
    textAlign:'center',
  },
  DessertText:{
    color: 'white',
fontSize: 25,
fontWeight: 'bold',
fontFamily: 'sans-serif',
  },
  MainsText:{
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  Mainsbox:{
    width:600,
    height:100,
    backgroundColor:'#C5C0AA',
    justifyContent:'center',
    alignItems: 'center',
    textAlign:'center',
  },
  StarterDishbox:{
    width:150,
    height:50,
    backgroundColor:'#C5C0AA',
    justifyContent:'center',
    alignItems: 'center',
    alignSelf:'flex-start',
    textAlign:'center',
   
  },
  StarterDescriptionText:{
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  InputBoxs:{
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems:'center',
  fontSize: 15,
  borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor:'#fff'
  },
  StarterDescriptionBox:{
    width:250,
      height:70,
      backgroundColor:'#44201C',
      justifyContent:'center',
      alignItems: 'center',
      textAlign:'center',
      alignSelf:'flex-start',
  },
  Starterspacer:{
height: 8//this will create space between boxes
  },
  StarterPriceBox:{
    width:150,
      height:50,
      backgroundColor:'#C5C0AA',
      justifyContent:'flex-start',
      alignItems: 'flex-end',
      textAlign:'center',
     alignSelf: 'flex-start',
     flexDirection:'row',
     
  },
  MainDishbox:{
    width:100,
    height:63,
    backgroundColor:'#C5C0AA',
    justifyContent:'center',
    alignItems: 'center',
    alignSelf:'flex-start',
    textAlign:'center',
   
  },
  MainDescriptionBox:{
    width:300,
      height:90,
      backgroundColor:'#44201C',
      justifyContent:'center',
      alignItems: 'center',
      textAlign:'center',
      alignSelf:'flex-start',
  },
  MainPriceBox:{
    width:100,
      height:70,
      backgroundColor:'#4D8A8B',
      justifyContent:'center',
      alignItems: 'center',
      textAlign:'center',
      alignSelf:'flex-start'
  },
  Mainspacer:{
    height: 8//this will create space between boxes
      },
      expandedBox:{
        width:400,
        height:350,
        backgroundColor:'#4D8A8B',
        justifyContent:'center',
        alignItems: 'center',
        textAlign:'center',
      },
      StarterexpandedBox:{
        width:600,
        height:450,
        backgroundColor:'#000',
        justifyContent:'flex-start',
        alignItems: 'center',
        textAlign:'center',
     
      }, 
      MainexpandedBox:{
        width:600,
        height:400,
        backgroundColor:'#000',
        justifyContent:'flex-start',
        alignItems: 'center',
        textAlign:'center',
      },
      DessertexpandedBox:{
        width:600,
        height:350,
        backgroundColor:'#000',
        justifyContent:'flex-start',
        alignItems: 'center',
        textAlign:'center',
      },
      Boxcontainer:{
        
    backgroundColor: '#000',
    alignItems: 'center',
    alignSelf:'flex-start',
    justifyContent:'center', 
    flexDirection:'row',
      },
      additemsBox:{
        width:80,
      height:50,
      backgroundColor:'#C5C0AA',
      justifyContent:'center',
      alignItems: 'center',
      textAlign:'center',
      alignSelf:'flex-start',
      flexDirection:'row',
      marginLeft: 10,
  }, pickerBox:{
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:8,
    overflow:'hidden',
    height:50,
    width: 300,
    color:'#44201C'

  },
picker:{
  height:50,
  width:'100%',
  backgroundColor:'white',
}, 
Courselabel:{
  marginBottom:10,
  fontSize:30,
},
text:{

},
message:{
  marginTop:10,
  color:'#4D8A8B',
  fontWeight:'500',
  fontFamily:'serif',
  fontSize:20,
  alignItems:'center',
  padding: 10,
  backgroundColor: '#d4edda',
  borderColor: '#c3e6cb',
  borderWidth: 1,
  borderRadius: 8,
  textAlign: 'center',

  
},
courseCount:{
  marginTop:20,
  fontWeight:'bold',
  fontSize:20,
  alignItems:'center',
  color:'#000'

}
});
