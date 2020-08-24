import React from 'react';
import configureMockStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { NavigationBar } from '.';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('Header Component', () => {    
    let store;
    const middlewares = [];
    const mockStore = configureMockStore(middlewares);

    beforeEach(() => {
        store = mockStore({});
    });

    it('should render correctly', () => {
        const component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <NavigationBar />
                </BrowserRouter>
            </Provider>
        );


        expect(component.find(NavigationBar)).toHaveLength(1)
    });
});