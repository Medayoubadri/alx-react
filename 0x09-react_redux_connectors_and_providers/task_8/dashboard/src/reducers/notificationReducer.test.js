import { Map, fromJS } from "immutable";
import notificationReducer from "./notificationReducer";
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  SET_LOADING_STATE,
} from "../actions/notificationActionTypes";

describe("notificationReducer", () => {
  const initialState = {
    notifications: {},
    filter: "DEFAULT",
    loading: false,
  };

  it("should return the default state", () => {
    const state = notificationReducer(undefined, {});
    expect(state.toJS()).toEqual(initialState);
  });

  it("should return the data passed with FETCH_NOTIFICATIONS_SUCCESS", () => {
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [
        {
          id: 1,
          type: "default",
          value: "New course available",
        },
        {
          id: 2,
          type: "urgent",
          value: "New resume available",
        },
        {
          id: 3,
          type: "urgent",
          value: "New data available",
        },
      ],
    };

    const expectedState = {
      filter: "DEFAULT",
      loading: false,
      notifications: {
        1: {
          id: 1,
          isRead: false,
          type: "default",
          value: "New course available",
        },
        2: {
          id: 2,
          isRead: false,
          type: "urgent",
          value: "New resume available",
        },
        3: {
          id: 3,
          isRead: false,
          type: "urgent",
          value: "New data available",
        },
      },
    };

    const state = notificationReducer(undefined, action);
    expect(state.toJS()).toEqual(expectedState);
  });

  it("should return the data with the right notification marked as read when MARK_AS_READ is passed", () => {
    const initialState = Map({
      filter: "DEFAULT",
      loading: false,
      notifications: fromJS({
        1: {
          id: 1,
          isRead: false,
          type: "default",
          value: "New course available",
        },
        2: {
          id: 2,
          isRead: false,
          type: "urgent",
          value: "New resume available",
        },
        3: {
          id: 3,
          isRead: false,
          type: "urgent",
          value: "New data available",
        },
      }),
    });

    const action = {
      type: MARK_AS_READ,
      index: 2,
    };

    const expectedState = {
      filter: "DEFAULT",
      loading: false,
      notifications: {
        1: {
          id: 1,
          isRead: false,
          type: "default",
          value: "New course available",
        },
        2: {
          id: 2,
          isRead: true,
          type: "urgent",
          value: "New resume available",
        },
        3: {
          id: 3,
          isRead: false,
          type: "urgent",
          value: "New data available",
        },
      },
    };

    const state = notificationReducer(initialState, action);
    expect(state.toJS()).toEqual(expectedState);
  });

  it("should return the data with the filter changed when SET_TYPE_FILTER is passed", () => {
    const initialState = Map({
      filter: "DEFAULT",
      loading: false,
      notifications: fromJS({
        1: {
          id: 1,
          isRead: false,
          type: "default",
          value: "New course available",
        },
        2: {
          id: 2,
          isRead: false,
          type: "urgent",
          value: "New resume available",
        },
        3: {
          id: 3,
          isRead: false,
          type: "urgent",
          value: "New data available",
        },
      }),
    });

    const action = {
      type: SET_TYPE_FILTER,
      filter: "URGENT",
    };

    const expectedState = {
      filter: "URGENT",
      loading: false,
      notifications: {
        1: {
          id: 1,
          isRead: false,
          type: "default",
          value: "New course available",
        },
        2: {
          id: 2,
          isRead: false,
          type: "urgent",
          value: "New resume available",
        },
        3: {
          id: 3,
          isRead: false,
          type: "urgent",
          value: "New data available",
        },
      },
    };

    const state = notificationReducer(initialState, action);
    expect(state.toJS()).toEqual(expectedState);
  });

  it("should return the data with the loading state updated when SET_LOADING_STATE is passed", () => {
    const action = {
      type: SET_LOADING_STATE,
      isLoading: true,
    };

    const expectedState = {
      notifications: {},
      filter: "DEFAULT",
      loading: true,
    };

    const state = notificationReducer(undefined, action);
    expect(state.toJS()).toEqual(expectedState);
  });
});
