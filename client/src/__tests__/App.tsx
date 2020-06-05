import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";

it("renders without crashing", () => {
  shallow(<App />);
});

it("renders site heading", () => {
  const wrapper = mount(<App />);
  const heading = (
    <div className="nav-bar__logo">
      <h1>Bookings</h1>
    </div>
  );
  expect(wrapper).toContainReact(heading);
});
