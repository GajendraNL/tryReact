import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Linking, Share, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { CardSection, NewCard } from './common';
import HeaderComponent from './HeaderComponent';
import { scale } from './common/scaling';

const { width, height } = Dimensions.get('window');

//const backgroundColor = '#0067a7';
class InHouseMagazine extends Component {
    static navigationOptions = ({ navigation }) => {
        const drawerLabel = 'Magazine';
        const drawerIcon = () => (
            <Image
                source={require('../../images/inhouse.png')}
                style={{ width: 38, height: 38 }}
            />
        );
        return { drawerLabel, drawerIcon };
    }

    state = { magazine: 'magazine1', blog: 'blog1', video: 'video1' };

    render() {
        const magazineData = [{ value: 'magazine1' }, { value: 'magazine2' }, { value: 'magazine3' }, { value: 'magazine4' }];
        const videoData = [{ value: 'video1' }, { value: 'video2' }, { value: 'video3' }, { value: 'video4' }];
        const blogData = [{ value: 'blog1' }, { value: 'blog2' }, { value: 'blog3' }, { value: 'blog4' }];
        const magazineLinks = { 'magazine1': 'https://www.google.co.in/',
                                'magazine2': 'https://www.google.co.in/',
                                'magazine3': 'https://www.google.co.in/',
                                'magazine4': 'https://www.google.co.in/'
                              };
        const blogLinks = { 'blog1': 'https://www.google.co.in/',
                            'blog2': 'https://www.google.co.in/',
                            'blog3': 'https://www.google.co.in/',
                            'blog4': 'https://www.google.co.in/'
                          };
        const videoLinks = { 'video1': 'https://www.google.co.in/',
                              'video2': 'https://www.google.co.in/',
                              'video3': 'https://www.google.co.in/',
                              'video4': 'https://www.google.co.in/'
                            };

        return (
            <View style={{ flex: 1, backgroundColor: this.props.themeSetting.astroListbg }}>
                <View>
                    <HeaderComponent {...this.props} />
                </View>
                <View>
                    <NewCard>
                        <CardSection>
                            <View style={styles.cardStyle}>
                                <View style={styles.dropDownStyle}>
                                    <Dropdown
                                        label='Magazines' labelFontSize={25} fontSize={20} data={magazineData}
                                        baseColor={this.props.themeSetting.textColor} textColor={this.props.themeSetting.textColor}
                                        itemColor='#000000' selectedItemColor='#000000'
                                        value={this.state.magazine}
                                        onChangeText={userChoice => this.setState({ magazine: userChoice })}
                                    />
                                </View>
                                <View style={styles.viewStyle}>
                                    <View style={styles.buttonStyle}>
                                        <TouchableOpacity onPress={() => Share.share({ message: magazineLinks[this.state.magazine] })}>
                                            <Image style={styles.shareStyle} source={require('../../images/share_4.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.buttonStyle}>
                                        <TouchableOpacity onPress={() => Linking.openURL(magazineLinks[this.state.magazine])}>
                                            <Image style={styles.shareStyle} source={require('../../images/link_1.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </CardSection>
                    </NewCard>
                    <NewCard>
                        <CardSection>
                            <View style={styles.cardStyle}>
                                <View style={styles.dropDownStyle}>
                                    <Dropdown
                                        label='Blogs' labelFontSize={23} fontSize={18} data={blogData}
                                        baseColor={this.props.themeSetting.textColor} textColor={this.props.themeSetting.textColor}
                                        itemColor='#000000' selectedItemColor='#000000'
                                        value={this.state.blog}
                                        onChangeText={userChoice => this.setState({ blog: userChoice })}
                                    />
                                </View>
                                <View style={styles.viewStyle}>
                                    <View style={styles.buttonStyle}>
                                        <TouchableOpacity onPress={() => Share.share({ message: blogLinks[this.state.blog] })}>
                                            <Image style={styles.shareStyle} source={require('../../images/share_4.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.buttonStyle}>
                                        <TouchableOpacity onPress={() => Linking.openURL(blogLinks[this.state.blog])}>
                                            <Image style={styles.shareStyle} source={require('../../images/link_1.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </CardSection>
                    </NewCard>
                    <NewCard>
                        <CardSection>
                            <View style={styles.cardStyle}>
                                <View style={styles.dropDownStyle}>
                                    <Dropdown
                                        label='Videos' labelFontSize={25} fontSize={20} data={videoData}
                                        baseColor={this.props.themeSetting.textColor} textColor={this.props.themeSetting.textColor}
                                        itemColor='#000000' selectedItemColor='#000000'
                                        value={this.state.video}
                                        onChangeText={userChoice => this.setState({ video: userChoice })}
                                    />
                                </View>
                                <View style={styles.viewStyle}>
                                    <View style={styles.buttonStyle}>
                                        <TouchableOpacity onPress={() => Share.share({message:videoLinks[this.state.video] })}>
                                            <Image style={styles.shareStyle} source={require('../../images/share_4.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.buttonStyle}>
                                        <TouchableOpacity onPress={() => Linking.openURL(videoLinks[this.state.video])}>
                                            <Image style={styles.shareStyle} source={require('../../images/link_1.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </CardSection>
                    </NewCard>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    shareStyle: {
        height: scale(30),
        alignItems: 'center',
        width: scale(30),
        borderRadius: 5,
        padding: 10
    },
    cardStyle: {
        flexDirection: 'row',
        marginLeft: scale(10),
        marginRight: scale(10)

    },
    viewStyle: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    dropDownStyle: {
        width: '50%',
    },
    buttonStyle: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '50%',
    }
});

const mapStateToProps = ({ themeSetting }) => {
    return { themeSetting };
};

export default connect(mapStateToProps)(InHouseMagazine);
