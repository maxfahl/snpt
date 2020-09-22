import { state } from './state';
import * as actions from './actions';
import { IConfig } from 'overmind';
import { createHook } from "overmind-react";

export const config = {
	// onInitialize,
	state,
	actions,
	// effects,
};

export const useOvermind = createHook<typeof config>();

declare module 'overmind' {
	interface Config extends IConfig<typeof config> {}
}
