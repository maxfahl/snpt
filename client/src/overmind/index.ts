import { state } from './state';
import * as actions from './actions';
import { IConfig } from 'overmind';
import { createHook } from "overmind-react";
import { gql } from "./effects/gql";
import { onInitialize } from "./onInitialize";

export const config = {
	onInitialize,
	state,
	actions,
	effects: {
		gql
	}
	// effects,
};

export const useOvermind = createHook<typeof config>();

declare module 'overmind' {
	interface Config extends IConfig<typeof config> {}
}
