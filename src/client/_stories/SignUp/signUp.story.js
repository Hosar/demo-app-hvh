import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Provider } from 'mobx-react';
import SignUp from '../../components/SignUp';
import VendorStore from '../../components/SignUp/vendor.store';
import SignUpForm from '../../components/SignUp/SignUpForm';
import ValidationErrors from '../../components/SignUp/ValidationErrors';
import { shallow, mount } from 'enzyme';
import { specs, describe, it } from 'storybook-addon-specifications';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import '../../../../public/css/bootstrap.min.css';

chai.use(chaiEnzyme());
const expect = chai.expect;

//TODO: mock http handler
const mockHttp = {
    post: function () {
        return this;
    },
    field: function () {
        return this;
    },
    attach: function () {
        return Promise.resolve('ok');
    }
};
const vendorStore = new VendorStore(mockHttp);

storiesOf('Vendor sign up', module)
    .add('Should show google maps to allow vendor select his position', () => {
        return <SignUp />;
    })
    .add('Validation errors', () => {
        const hasErrorsStyle = { width: '100%' };
        const errors = [
            'Please select a country',
            'Email can\'t be blank',
            'PublicName can\'t be blank'];

        const cmp = <ValidationErrors errors={errors} hasErrorsStyle={hasErrorsStyle} closeOverlay={() => { }} />;
        specs(() => describe('Validation errors', () => {
            it('Should show a list of errors', () => {
                const wrapper = mount(cmp);
                const errMsgs = wrapper.find('h2');
                console.log('errMsgs:');
                console.log(errMsgs);
                expect(errMsgs).to.have.length.of(3);
            });
        }));

        return cmp;
    })
    .add('Show validations when submit', () => {
        const cmp = (
            <Provider vendorStore={vendorStore}>
                <SignUpForm />
            </Provider>
        );

        specs(() => describe('Show validations when submit', () => {
            it('should show an overlay with the errors', () => {
                vendorStore.setVendorInfo({ publicName: '' });
                const wrapper = mount(cmp);
                const button = wrapper.find('.btn .btn-block .btn-info');
                const overlay = wrapper.find('.overlay');
                button.simulate('click');
                expect(overlay).to.have.style('width', '100%');
            });
        }));
        return cmp;
    })
    .add('Not show errors when submit', () => {
        const cmp = (
            <Provider vendorStore={vendorStore}>
                <SignUpForm />
            </Provider>
        );

        specs(() => describe('Not show errors when submit', () => {
            it('should not show any errors', () => {
                vendorStore.setVendorInfo({
                    email: 'some@gmail.com',
                    publicName: 'someName',
                    country: {
                        shortName: 'MX',
                        longName: 'Mexico'
                    }
                });
                vendorStore.setVendorLogo(['fake value']);
                const wrapper = mount(cmp);
                const button = wrapper.find('.btn .btn-block .btn-info');
                const overlay = wrapper.find('.overlay');
                button.simulate('click');
                expect(overlay).to.have.style('width', '0px');
            });
        }));
        return cmp;
    })
    .add('Show missing vendor logo', () => {
        const _vendorStore = new VendorStore();
        _vendorStore.setVendorInfo({
            email: 'some@gmail.com',
            publicName: 'someName',
            country: {
                shortName: 'MX',
                longName: 'Mexico'
            }
        });
        const cmp = (
            <Provider vendorStore={_vendorStore}>
                <SignUpForm />
            </Provider>
        );

        specs(() => describe('Show missing vendor logo', () => {
            it('should show missing vendor logo error', () => {
                const wrapper = mount(cmp);
                const button = wrapper.find('.btn .btn-block .btn-info');
                const overlay = wrapper.find('.overlay');
                button.simulate('click');
                expect(overlay).to.have.style('width', '100%');
            });
        }));

        return cmp;
    });