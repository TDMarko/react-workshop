/**
 * @jest-environment node
 */

import "jsdom-global/register";

import * as React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { App } from "../App";

configure({ adapter: new Adapter() });

describe("Some test", () => {
    it("should render app", () => {
        const wrapper = mount(<App />);
        expect(wrapper).toHaveLength(1);
    });
});
