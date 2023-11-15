import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import color from './constants/color';
import choices from './data/mockData';
import {useState} from 'react';

function App() {
  const [userChoise, setUserChoise] = useState(null);
  const [computerChoise, setComputerChoise] = useState(null);
  const [result, setResult] = useState('');

  const handleUserChoice = choice => {
    setUserChoise(choice);
    randomComputerChoice(choice);
  };
  const randomComputerChoice = choice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerRandomChoice = choices[randomIndex];
    setComputerChoise(computerRandomChoice);
    determineWinner(choice, computerRandomChoice);
  };

  const determineWinner = (user, computerRandomChoice) => {
    if (user?.name === computerRandomChoice?.name) {
      setResult('Berabere');
    } else if (
      (user?.name === 'Taş' && computerRandomChoice?.name === 'Makas') ||
      (user?.name === 'Kağıt' && computerRandomChoice?.name === 'Taş') ||
      (user?.name === 'Makas' && computerRandomChoice?.name === 'Kağıt')
    ) {
      setResult('Kazandın');
    } else {
      setResult('Kaybettin');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Taş Kağıt Makas</Text>
        <Text style={styles.computerChoiceText}>Kullanıcının Seçimi</Text>
        <View style={styles.choices}>
          {choices?.map((choice, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.5}
              onPress={() => handleUserChoice(choice)}
              style={
                choice?.name === userChoise?.name
                  ? [styles.button, styles.buttonActive]
                  : styles.button
              }>
              <Image style={styles.image} source={choice.image} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.resultText}>{result}</Text>
        {computerChoise && (
          <>
            <Text style={styles.resultText}>Bilgisayarın Seçimi</Text>
            <View style={styles.button}>
              <Image style={styles.image} source={computerChoise?.image} />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.backgroundColor,
  },
  title: {
    color: color.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  computerChoiceText: {
    marginVertical: 20,
    fontSize: 20,
    color: color.white,
  },
  choice: {},
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: color.white,
  },
  buttonActive: {
    borderWidth: 2,
  },
  choices: {flexDirection: 'row', gap: 10, justifyContent: 'space-around'},
  image: {
    width: 90,
    height: 90,
  },
  resultText: {
    fontSize: 20,
    color: color.white,
    marginVertical: 20,
  },
});
