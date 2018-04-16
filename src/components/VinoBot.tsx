import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import * as React from 'react';
import '../css/vinobot.css';
import { VinoBotResult } from './VinoBotResult';
import { connect } from 'react-redux';
import { RootState } from '../store';

const theme = {
    background: '#F1DAC8',
    fontFamily: 'Open Sans',
    headerBgColor: '#42626D',
    headerFontColor: '#F1DAC8',
    headerFontSize: '25px',
    botBubbleColor: '#42626D',
    botFontColor: '#fff',
    userBubbleColor: '#B74E55',
    userFontColor: '#fff',
};

const avatarStyle = {
    width: '70px',
    height: '70px',
    objectFit: 'contain',
    borderRadius: '100px',
    border: '2px solid #42626D',
};

const bubbleStyle = {
    marginBottom: '30px',
    textAlign: 'center'
};

export class PureVinoBot extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            steps: [
                // {
                //     id: 'welcome1',
                //     message: `Hey ${this.props.profile.username || 'Guest'}! What can I help you?`,
                //     trigger: 'service'
                // },
                // {
                //     id: 'welcome2',
                //     message: `So......  ${this.props.profile.username || 'Guest'}, What else I can help you?`,
                //     trigger: 'service'
                // },
                // {
                //     id: 'service',
                //     options: [
                //         { value: 'recommadation', label: 'Wine recommadation', trigger: 'question1' },
                //         { value: 'wine search', label: 'Wine search', trigger: 'return' },
                //         { value: 'wine price', label: 'Wine price', trigger: 'return' }
                //     ]
                // },
                // {
                //     id: 'return',
                //     message: 'I am just a faked chatbot!\n What do you want from me!!?',
                //     trigger: 'welcome2'
                // },
                // {
                //     id: 'question1',
                //     message: 'Which of these is your morning go-to coffee?',
                //     trigger: 'options1'
                // },
                // {
                //     id: 'options1',
                //     options: [
                //         { value: 'newWorld', label: 'Black coffee', trigger: 'question2' },
                //         {
                //             value: 'oldWorld',
                //             label: 'Coffee with milk',
                //             trigger: 'question2',
                //         },
                //     ]
                // },
                // {
                //     id: 'question2',
                //     message: 'Which of property of wine you prefer?',
                //     trigger: 'options2'
                // },
                // {
                //     id: 'options2',
                //     options: [
                //         { value: 'red', label: 'Bitter taste', trigger: 'question3' },
                //         { value: 'sparkling', label: 'Fizzy', trigger: 'question3' },
                //         {
                //             value: 'rose',
                //             label: 'Flower and Fruity taste',
                //             trigger: 'question3'
                //         },
                //         {
                //             value: 'white',
                //             label: 'Flabby or tart',
                //             trigger: 'question3'
                //         },
                //         {
                //             value: 'dessert',
                //             label: 'Sweet taste',
                //             trigger: 'question3'
                //         }
                //     ]
                // },
                {
                    id: 'question3',
                    message: 'Which of food you prefer to serve with wine?',
                    trigger: 'options3'
                },
                {
                    id: 'options3',
                    options: [
                        { value: 'cheese', label: 'Cheese', trigger: 'search' },
                        { value: 'meat', label: 'Meat', trigger: 'search' },
                        { value: 'candy', label: 'Dessert', trigger: 'search' },
                        { value: 'seafood', label: 'Fish', trigger: 'search' },
                        { value: 'fruit', label: 'Fruit', trigger: 'search' }
                    ]
                },
                {
                    id: 'search',
                    component: <VinoBotResult />,
                    waitAction: true,
                    end: true
                    // trigger: 'question1',
                }
            ]
        };
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <ChatBot
                    width="100%"
                    headerTitle="VinoBot"
                    botAvatar="robot.png"
                    userAvatar={this.props.profile.picture || 'guestuser.jpg'}
                    steps={this.state.steps}
                    avatarStyle={avatarStyle}
                    bubbleStyle={bubbleStyle}
                />
            </ThemeProvider>
        );
    }
}

export const VinoBot = connect((state: RootState) => ({ profile: state.profile }))(PureVinoBot);