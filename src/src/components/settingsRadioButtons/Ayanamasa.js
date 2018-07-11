import React, { Component } from 'react';
import { View, Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from '../common';
import { settingAyanamasa } from '../../actions';

const options = [
  { value: '23', label: 'Aryabhata' },
  { value: '24', label: 'Aryabhata, mean Sun' },
  { value: '20', label: 'B1950' },
  { value: '14', label: 'Babylonian/Aldebaran = 15 Tau' },
  { value: '13', label: 'Babylonian/Eta Piscium' },
  { value: '12', label: 'Babylonian/Huber' },
  { value: '9', label: 'Babylonian/Kugler 1' },
  { value: '10', label: 'Babylonian/Kugler 2' },
  { value: '11', label: 'Babylonian/Kugler 3' },
  { value: '2', label: 'De Luce' },
  { value: '6', label: 'Djwhal Khul' },
  { value: '0', label: 'Fagan/Bradley' },
  { value: '17', label: 'Galact. Center = 0 Sag' },
  { value: '15', label: 'Hipparchos' },
  { value: '8', label: 'J.N. Bhasin' },
  { value: '19', label: 'J1900' },
  { value: '18', label: 'J2000' },
  { value: '5', label: 'Krishnamurti' },
  { value: '1', label: 'Lahiri' },
  { value: '3', label: 'Raman' },
  { value: '25', label: 'SS Citra' },
  { value: '26', label: 'SS Revati' },
  { value: '16', label: 'Sassanian' },
  { value: '21', label: 'Suryasiddhanta' },
  { value: '22', label: 'Suryasiddhanta, mean Sun' },
  { value: '27', label: 'True Citra' },
  { value: '29', label: 'True Pushya' },
  { value: '28', label: 'True Revati' },
  { value: '4', label: 'Ushashashi' },
  { value: '7', label: 'Yukteshwar' }
];

class Ayanamasa extends Component {

  state = { options, ayanamsaString: 'Raman' };

    updateStore(value, index) {
        this.setState({ ayanamsaString: this.state.options[index].label }, () => {
          this.props.settingAyanamasa({ value, ayanamsaString: this.state.ayanamsaString });
        });
    }

    render() {
        return (
            <CardSection>
              <View style={{ flex: 1, }}>
                <Text style={{ color: this.props.themeSetting.textColor }}>Ayanamsa</Text>
                <Picker
                  mode="dropdown"
                  selectedValue={this.props.settings.ayanamsa_type}
                  style={{ color: this.props.themeSetting.textColor }}
                  onValueChange={(value, index) => { this.updateStore(value, index); }}
                >
                  {this.state.options.map((item, index) => {
                    return (<Picker.Item label={item.label} value={item.value} key={index} />);
                  })}
                </Picker>
                </View>
            </CardSection>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        settingAyanamasa: data => dispatch(settingAyanamasa(data))
    };
};

const mapStateToProps = ({ themeSetting, settings }) => {
    return { themeSetting, settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ayanamasa);
