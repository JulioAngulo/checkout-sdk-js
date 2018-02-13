import { getGuestCustomer } from './customers.mock';
import { getErrorResponse } from '../common/http-request/responses.mock';
import CustomerSelector from './customer-selector';

describe('CustomerSelector', () => {
    let customerSelector;
    let state;

    beforeEach(() => {
        state = {
            customer: {
                data: getGuestCustomer(),
            },
        };
    });

    describe('#getCustomer()', () => {
        it('returns the current customer', () => {
            customerSelector = new CustomerSelector(state.customer);

            expect(customerSelector.getCustomer()).toEqual(state.customer.data);
        });
    });

    describe('#getSignInError()', () => {
        it('returns error if unable to sign in', () => {
            const signInError = getErrorResponse();

            customerSelector = new CustomerSelector({
                ...state.customer,
                errors: { signInError },
            });

            expect(customerSelector.getSignInError()).toEqual(signInError);
        });

        it('does not returns error if able to sign in', () => {
            customerSelector = new CustomerSelector(state.customer);

            expect(customerSelector.getSignInError()).toBeUndefined();
        });
    });

    describe('#getSignOutError()', () => {
        it('returns error if unable to sign out', () => {
            const signOutError = getErrorResponse();

            customerSelector = new CustomerSelector({
                ...state.customer,
                errors: { signOutError },
            });

            expect(customerSelector.getSignOutError()).toEqual(signOutError);
        });

        it('does not returns error if able to sign out', () => {
            customerSelector = new CustomerSelector(state.customer);

            expect(customerSelector.getSignOutError()).toBeUndefined();
        });
    });

    describe('#isSigningIn()', () => {
        it('returns true if signing in', () => {
            customerSelector = new CustomerSelector({
                ...state.customer,
                statuses: { isSigningIn: true },
            });

            expect(customerSelector.isSigningIn()).toEqual(true);
        });

        it('returns false if not signing in', () => {
            customerSelector = new CustomerSelector(state.customer);

            expect(customerSelector.isSigningIn()).toEqual(false);
        });
    });

    describe('#isSigningOut()', () => {
        it('returns true if signing out', () => {
            customerSelector = new CustomerSelector({
                ...state.customer,
                statuses: { isSigningOut: true },
            });

            expect(customerSelector.isSigningOut()).toEqual(true);
        });

        it('returns false if not signing out', () => {
            customerSelector = new CustomerSelector(state.customer);

            expect(customerSelector.isSigningOut()).toEqual(false);
        });
    });
});