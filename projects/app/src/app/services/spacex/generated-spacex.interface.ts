/* 🚨 This file is generated by *GraphQL Codegen* 🚨 */
export type Maybe<T> = T | undefined
export type InputMaybe<T> = T | undefined
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
	[_ in K]?: never
}
export type Incremental<T> =
	| T
	| { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string }
	String: { input: string; output: string }
	Boolean: { input: boolean; output: boolean }
	Int: { input: number; output: number }
	Float: { input: number; output: number }
	Date: { input: Date; output: Date }
	ObjectID: { input: unknown; output: unknown }
	_Any: { input: unknown; output: unknown }
	federation__FieldSet: { input: unknown; output: unknown }
	link__Import: { input: unknown; output: unknown }
	timestamptz: { input: unknown; output: unknown }
	uuid: { input: string; output: string }
}

export type Address = {
	address: Maybe<Scalars["String"]["output"]>
	city: Maybe<Scalars["String"]["output"]>
	state: Maybe<Scalars["String"]["output"]>
}

export type Capsule = {
	/** @deprecated This is not available in the REST API after MongoDB has been deprecated */
	dragon: Maybe<Dragon>
	id: Maybe<Scalars["ID"]["output"]>
	landings: Maybe<Scalars["Int"]["output"]>
	missions: Maybe<Array<Maybe<CapsuleMission>>>
	original_launch: Maybe<Scalars["Date"]["output"]>
	reuse_count: Maybe<Scalars["Int"]["output"]>
	status: Maybe<Scalars["String"]["output"]>
	type: Maybe<Scalars["String"]["output"]>
}

export type CapsuleMission = {
	flight: Maybe<Scalars["Int"]["output"]>
	name: Maybe<Scalars["String"]["output"]>
}

export type CapsulesFind = {
	id: InputMaybe<Scalars["ID"]["input"]>
	landings: InputMaybe<Scalars["Int"]["input"]>
	mission: InputMaybe<Scalars["String"]["input"]>
	original_launch: InputMaybe<Scalars["Date"]["input"]>
	reuse_count: InputMaybe<Scalars["Int"]["input"]>
	status: InputMaybe<Scalars["String"]["input"]>
	type: InputMaybe<Scalars["String"]["input"]>
}

export type Core = {
	asds_attempts: Maybe<Scalars["Int"]["output"]>
	asds_landings: Maybe<Scalars["Int"]["output"]>
	block: Maybe<Scalars["Int"]["output"]>
	id: Maybe<Scalars["ID"]["output"]>
	missions: Maybe<Array<Maybe<CapsuleMission>>>
	original_launch: Maybe<Scalars["Date"]["output"]>
	reuse_count: Maybe<Scalars["Int"]["output"]>
	rtls_attempts: Maybe<Scalars["Int"]["output"]>
	rtls_landings: Maybe<Scalars["Int"]["output"]>
	status: Maybe<Scalars["String"]["output"]>
	water_landing: Maybe<Scalars["Boolean"]["output"]>
}

export type CoreMission = {
	flight: Maybe<Scalars["Int"]["output"]>
	name: Maybe<Scalars["String"]["output"]>
}

export type CoresFind = {
	asds_attempts: InputMaybe<Scalars["Int"]["input"]>
	asds_landings: InputMaybe<Scalars["Int"]["input"]>
	block: InputMaybe<Scalars["Int"]["input"]>
	id: InputMaybe<Scalars["String"]["input"]>
	missions: InputMaybe<Scalars["String"]["input"]>
	original_launch: InputMaybe<Scalars["Date"]["input"]>
	reuse_count: InputMaybe<Scalars["Int"]["input"]>
	rtls_attempts: InputMaybe<Scalars["Int"]["input"]>
	rtls_landings: InputMaybe<Scalars["Int"]["input"]>
	status: InputMaybe<Scalars["String"]["input"]>
	water_landing: InputMaybe<Scalars["Boolean"]["input"]>
}

export type Distance = {
	feet: Maybe<Scalars["Float"]["output"]>
	meters: Maybe<Scalars["Float"]["output"]>
}

export type Dragon = {
	active: Maybe<Scalars["Boolean"]["output"]>
	crew_capacity: Maybe<Scalars["Int"]["output"]>
	description: Maybe<Scalars["String"]["output"]>
	diameter: Maybe<Distance>
	dry_mass_kg: Maybe<Scalars["Int"]["output"]>
	dry_mass_lb: Maybe<Scalars["Int"]["output"]>
	first_flight: Maybe<Scalars["String"]["output"]>
	heat_shield: Maybe<DragonHeatShield>
	height_w_trunk: Maybe<Distance>
	id: Maybe<Scalars["ID"]["output"]>
	launch_payload_mass: Maybe<Mass>
	launch_payload_vol: Maybe<Volume>
	name: Maybe<Scalars["String"]["output"]>
	orbit_duration_yr: Maybe<Scalars["Int"]["output"]>
	pressurized_capsule: Maybe<DragonPressurizedCapsule>
	return_payload_mass: Maybe<Mass>
	return_payload_vol: Maybe<Volume>
	sidewall_angle_deg: Maybe<Scalars["Float"]["output"]>
	thrusters: Maybe<Array<Maybe<DragonThrust>>>
	trunk: Maybe<DragonTrunk>
	type: Maybe<Scalars["String"]["output"]>
	wikipedia: Maybe<Scalars["String"]["output"]>
}

export type DragonHeatShield = {
	dev_partner: Maybe<Scalars["String"]["output"]>
	material: Maybe<Scalars["String"]["output"]>
	size_meters: Maybe<Scalars["Float"]["output"]>
	temp_degrees: Maybe<Scalars["Int"]["output"]>
}

export type DragonPressurizedCapsule = {
	payload_volume: Maybe<Volume>
}

export type DragonThrust = {
	amount: Maybe<Scalars["Int"]["output"]>
	fuel_1: Maybe<Scalars["String"]["output"]>
	fuel_2: Maybe<Scalars["String"]["output"]>
	pods: Maybe<Scalars["Int"]["output"]>
	thrust: Maybe<Force>
	type: Maybe<Scalars["String"]["output"]>
}

export type DragonTrunk = {
	cargo: Maybe<DragonTrunkCargo>
	trunk_volume: Maybe<Volume>
}

export type DragonTrunkCargo = {
	solar_array: Maybe<Scalars["Int"]["output"]>
	unpressurized_cargo: Maybe<Scalars["Boolean"]["output"]>
}

export type Force = {
	kN: Maybe<Scalars["Float"]["output"]>
	lbf: Maybe<Scalars["Float"]["output"]>
}

export type HistoriesResult = {
	data: Maybe<Array<Maybe<History>>>
	result: Maybe<Result>
}

export type History = {
	details: Maybe<Scalars["String"]["output"]>
	event_date_unix: Maybe<Scalars["Date"]["output"]>
	event_date_utc: Maybe<Scalars["Date"]["output"]>
	flight: Maybe<Launch>
	id: Maybe<Scalars["ID"]["output"]>
	links: Maybe<Link>
	title: Maybe<Scalars["String"]["output"]>
}

export type HistoryFind = {
	end: InputMaybe<Scalars["Date"]["input"]>
	flight_number: InputMaybe<Scalars["Int"]["input"]>
	id: InputMaybe<Scalars["ID"]["input"]>
	start: InputMaybe<Scalars["Date"]["input"]>
}

export type Info = {
	ceo: Maybe<Scalars["String"]["output"]>
	coo: Maybe<Scalars["String"]["output"]>
	cto: Maybe<Scalars["String"]["output"]>
	cto_propulsion: Maybe<Scalars["String"]["output"]>
	employees: Maybe<Scalars["Int"]["output"]>
	founded: Maybe<Scalars["Int"]["output"]>
	founder: Maybe<Scalars["String"]["output"]>
	headquarters: Maybe<Address>
	launch_sites: Maybe<Scalars["Int"]["output"]>
	links: Maybe<InfoLinks>
	name: Maybe<Scalars["String"]["output"]>
	summary: Maybe<Scalars["String"]["output"]>
	test_sites: Maybe<Scalars["Int"]["output"]>
	valuation: Maybe<Scalars["Float"]["output"]>
	vehicles: Maybe<Scalars["Int"]["output"]>
}

export type InfoLinks = {
	elon_twitter: Maybe<Scalars["String"]["output"]>
	flickr: Maybe<Scalars["String"]["output"]>
	twitter: Maybe<Scalars["String"]["output"]>
	website: Maybe<Scalars["String"]["output"]>
}

export type Landpad = {
	attempted_landings: Maybe<Scalars["String"]["output"]>
	details: Maybe<Scalars["String"]["output"]>
	full_name: Maybe<Scalars["String"]["output"]>
	id: Maybe<Scalars["ID"]["output"]>
	landing_type: Maybe<Scalars["String"]["output"]>
	location: Maybe<Location>
	status: Maybe<Scalars["String"]["output"]>
	successful_landings: Maybe<Scalars["String"]["output"]>
	wikipedia: Maybe<Scalars["String"]["output"]>
}

export type Launch = {
	details: Maybe<Scalars["String"]["output"]>
	id: Maybe<Scalars["ID"]["output"]>
	is_tentative: Maybe<Scalars["Boolean"]["output"]>
	launch_date_local: Maybe<Scalars["Date"]["output"]>
	launch_date_unix: Maybe<Scalars["Date"]["output"]>
	launch_date_utc: Maybe<Scalars["Date"]["output"]>
	launch_site: Maybe<LaunchSite>
	launch_success: Maybe<Scalars["Boolean"]["output"]>
	launch_year: Maybe<Scalars["String"]["output"]>
	links: Maybe<LaunchLinks>
	mission_id: Maybe<Array<Maybe<Scalars["String"]["output"]>>>
	mission_name: Maybe<Scalars["String"]["output"]>
	rocket: Maybe<LaunchRocket>
	ships: Maybe<Array<Maybe<Ship>>>
	static_fire_date_unix: Maybe<Scalars["Date"]["output"]>
	static_fire_date_utc: Maybe<Scalars["Date"]["output"]>
	telemetry: Maybe<LaunchTelemetry>
	tentative_max_precision: Maybe<Scalars["String"]["output"]>
	upcoming: Maybe<Scalars["Boolean"]["output"]>
}

export type LaunchFind = {
	apoapsis_km: InputMaybe<Scalars["Float"]["input"]>
	block: InputMaybe<Scalars["Int"]["input"]>
	cap_serial: InputMaybe<Scalars["String"]["input"]>
	capsule_reuse: InputMaybe<Scalars["String"]["input"]>
	core_flight: InputMaybe<Scalars["Int"]["input"]>
	core_reuse: InputMaybe<Scalars["String"]["input"]>
	core_serial: InputMaybe<Scalars["String"]["input"]>
	customer: InputMaybe<Scalars["String"]["input"]>
	eccentricity: InputMaybe<Scalars["Float"]["input"]>
	end: InputMaybe<Scalars["Date"]["input"]>
	epoch: InputMaybe<Scalars["Date"]["input"]>
	fairings_recovered: InputMaybe<Scalars["String"]["input"]>
	fairings_recovery_attempt: InputMaybe<Scalars["String"]["input"]>
	fairings_reuse: InputMaybe<Scalars["String"]["input"]>
	fairings_reused: InputMaybe<Scalars["String"]["input"]>
	fairings_ship: InputMaybe<Scalars["String"]["input"]>
	gridfins: InputMaybe<Scalars["String"]["input"]>
	id: InputMaybe<Scalars["ID"]["input"]>
	inclination_deg: InputMaybe<Scalars["Float"]["input"]>
	land_success: InputMaybe<Scalars["String"]["input"]>
	landing_intent: InputMaybe<Scalars["String"]["input"]>
	landing_type: InputMaybe<Scalars["String"]["input"]>
	landing_vehicle: InputMaybe<Scalars["String"]["input"]>
	launch_date_local: InputMaybe<Scalars["Date"]["input"]>
	launch_date_utc: InputMaybe<Scalars["Date"]["input"]>
	launch_success: InputMaybe<Scalars["String"]["input"]>
	launch_year: InputMaybe<Scalars["String"]["input"]>
	legs: InputMaybe<Scalars["String"]["input"]>
	lifespan_years: InputMaybe<Scalars["Float"]["input"]>
	longitude: InputMaybe<Scalars["Float"]["input"]>
	manufacturer: InputMaybe<Scalars["String"]["input"]>
	mean_motion: InputMaybe<Scalars["Float"]["input"]>
	mission_id: InputMaybe<Scalars["String"]["input"]>
	mission_name: InputMaybe<Scalars["String"]["input"]>
	nationality: InputMaybe<Scalars["String"]["input"]>
	norad_id: InputMaybe<Scalars["Int"]["input"]>
	orbit: InputMaybe<Scalars["String"]["input"]>
	payload_id: InputMaybe<Scalars["String"]["input"]>
	payload_type: InputMaybe<Scalars["String"]["input"]>
	periapsis_km: InputMaybe<Scalars["Float"]["input"]>
	period_min: InputMaybe<Scalars["Float"]["input"]>
	raan: InputMaybe<Scalars["Float"]["input"]>
	reference_system: InputMaybe<Scalars["String"]["input"]>
	regime: InputMaybe<Scalars["String"]["input"]>
	reused: InputMaybe<Scalars["String"]["input"]>
	rocket_id: InputMaybe<Scalars["String"]["input"]>
	rocket_name: InputMaybe<Scalars["String"]["input"]>
	rocket_type: InputMaybe<Scalars["String"]["input"]>
	second_stage_block: InputMaybe<Scalars["String"]["input"]>
	semi_major_axis_km: InputMaybe<Scalars["Float"]["input"]>
	ship: InputMaybe<Scalars["String"]["input"]>
	side_core1_reuse: InputMaybe<Scalars["String"]["input"]>
	side_core2_reuse: InputMaybe<Scalars["String"]["input"]>
	site_id: InputMaybe<Scalars["String"]["input"]>
	site_name: InputMaybe<Scalars["String"]["input"]>
	site_name_long: InputMaybe<Scalars["String"]["input"]>
	start: InputMaybe<Scalars["Date"]["input"]>
	tbd: InputMaybe<Scalars["String"]["input"]>
	tentative: InputMaybe<Scalars["String"]["input"]>
	tentative_max_precision: InputMaybe<Scalars["String"]["input"]>
}

export type LaunchLinks = {
	article_link: Maybe<Scalars["String"]["output"]>
	flickr_images: Maybe<Array<Maybe<Scalars["String"]["output"]>>>
	mission_patch: Maybe<Scalars["String"]["output"]>
	mission_patch_small: Maybe<Scalars["String"]["output"]>
	presskit: Maybe<Scalars["String"]["output"]>
	reddit_campaign: Maybe<Scalars["String"]["output"]>
	reddit_launch: Maybe<Scalars["String"]["output"]>
	reddit_media: Maybe<Scalars["String"]["output"]>
	reddit_recovery: Maybe<Scalars["String"]["output"]>
	video_link: Maybe<Scalars["String"]["output"]>
	wikipedia: Maybe<Scalars["String"]["output"]>
}

export type LaunchRocket = {
	fairings: Maybe<LaunchRocketFairings>
	first_stage: Maybe<LaunchRocketFirstStage>
	rocket: Maybe<Rocket>
	rocket_name: Maybe<Scalars["String"]["output"]>
	rocket_type: Maybe<Scalars["String"]["output"]>
	second_stage: Maybe<LaunchRocketSecondStage>
}

export type LaunchRocketFairings = {
	recovered: Maybe<Scalars["Boolean"]["output"]>
	recovery_attempt: Maybe<Scalars["Boolean"]["output"]>
	reused: Maybe<Scalars["Boolean"]["output"]>
	ship: Maybe<Scalars["String"]["output"]>
}

export type LaunchRocketFirstStage = {
	cores: Maybe<Array<Maybe<LaunchRocketFirstStageCore>>>
}

export type LaunchRocketFirstStageCore = {
	block: Maybe<Scalars["Int"]["output"]>
	core: Maybe<Core>
	flight: Maybe<Scalars["Int"]["output"]>
	gridfins: Maybe<Scalars["Boolean"]["output"]>
	land_success: Maybe<Scalars["Boolean"]["output"]>
	landing_intent: Maybe<Scalars["Boolean"]["output"]>
	landing_type: Maybe<Scalars["String"]["output"]>
	landing_vehicle: Maybe<Scalars["String"]["output"]>
	legs: Maybe<Scalars["Boolean"]["output"]>
	reused: Maybe<Scalars["Boolean"]["output"]>
}

export type LaunchRocketSecondStage = {
	block: Maybe<Scalars["Int"]["output"]>
	payloads: Maybe<Array<Maybe<Payload>>>
}

export type LaunchSite = {
	site_id: Maybe<Scalars["String"]["output"]>
	site_name: Maybe<Scalars["String"]["output"]>
	site_name_long: Maybe<Scalars["String"]["output"]>
}

export type LaunchTelemetry = {
	flight_club: Maybe<Scalars["String"]["output"]>
}

export type LaunchesPastResult = {
	data: Maybe<Array<Maybe<Launch>>>
	result: Maybe<Result>
}

export type Launchpad = {
	attempted_launches: Maybe<Scalars["Int"]["output"]>
	details: Maybe<Scalars["String"]["output"]>
	id: Maybe<Scalars["ID"]["output"]>
	location: Maybe<Location>
	name: Maybe<Scalars["String"]["output"]>
	status: Maybe<Scalars["String"]["output"]>
	successful_launches: Maybe<Scalars["Int"]["output"]>
	vehicles_launched: Maybe<Array<Maybe<Rocket>>>
	wikipedia: Maybe<Scalars["String"]["output"]>
}

export type Link = {
	article: Maybe<Scalars["String"]["output"]>
	reddit: Maybe<Scalars["String"]["output"]>
	wikipedia: Maybe<Scalars["String"]["output"]>
}

export type Location = {
	latitude: Maybe<Scalars["Float"]["output"]>
	longitude: Maybe<Scalars["Float"]["output"]>
	name: Maybe<Scalars["String"]["output"]>
	region: Maybe<Scalars["String"]["output"]>
}

export type Mass = {
	kg: Maybe<Scalars["Int"]["output"]>
	lb: Maybe<Scalars["Int"]["output"]>
}

export type Mission = {
	description: Maybe<Scalars["String"]["output"]>
	id: Maybe<Scalars["ID"]["output"]>
	manufacturers: Maybe<Array<Maybe<Scalars["String"]["output"]>>>
	name: Maybe<Scalars["String"]["output"]>
	payloads: Maybe<Array<Maybe<Payload>>>
	twitter: Maybe<Scalars["String"]["output"]>
	website: Maybe<Scalars["String"]["output"]>
	wikipedia: Maybe<Scalars["String"]["output"]>
}

export type MissionResult = {
	data: Maybe<Array<Maybe<Mission>>>
	result: Maybe<Result>
}

export type MissionsFind = {
	id: InputMaybe<Scalars["ID"]["input"]>
	manufacturer: InputMaybe<Scalars["String"]["input"]>
	name: InputMaybe<Scalars["String"]["input"]>
	payload_id: InputMaybe<Scalars["String"]["input"]>
}

export type Mutation = {
	delete_users: Maybe<Users_Mutation_Response>
	insert_users: Maybe<Users_Mutation_Response>
	update_users: Maybe<Users_Mutation_Response>
}

export type Mutation_Delete_UsersArgs = {
	where: Users_Bool_Exp
}

export type Mutation_Insert_UsersArgs = {
	objects: Array<Users_Insert_Input>
	on_conflict: InputMaybe<Users_On_Conflict>
}

export type Mutation_Update_UsersArgs = {
	_set: InputMaybe<Users_Set_Input>
	where: Users_Bool_Exp
}

export type Payload = {
	customers: Maybe<Array<Maybe<Scalars["String"]["output"]>>>
	id: Maybe<Scalars["ID"]["output"]>
	manufacturer: Maybe<Scalars["String"]["output"]>
	nationality: Maybe<Scalars["String"]["output"]>
	norad_id: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>
	orbit: Maybe<Scalars["String"]["output"]>
	orbit_params: Maybe<PayloadOrbitParams>
	payload_mass_kg: Maybe<Scalars["Float"]["output"]>
	payload_mass_lbs: Maybe<Scalars["Float"]["output"]>
	payload_type: Maybe<Scalars["String"]["output"]>
	reused: Maybe<Scalars["Boolean"]["output"]>
}

export type PayloadOrbitParams = {
	apoapsis_km: Maybe<Scalars["Float"]["output"]>
	arg_of_pericenter: Maybe<Scalars["Float"]["output"]>
	eccentricity: Maybe<Scalars["Float"]["output"]>
	epoch: Maybe<Scalars["Date"]["output"]>
	inclination_deg: Maybe<Scalars["Float"]["output"]>
	lifespan_years: Maybe<Scalars["Float"]["output"]>
	longitude: Maybe<Scalars["Float"]["output"]>
	mean_anomaly: Maybe<Scalars["Float"]["output"]>
	mean_motion: Maybe<Scalars["Float"]["output"]>
	periapsis_km: Maybe<Scalars["Float"]["output"]>
	period_min: Maybe<Scalars["Float"]["output"]>
	raan: Maybe<Scalars["Float"]["output"]>
	reference_system: Maybe<Scalars["String"]["output"]>
	regime: Maybe<Scalars["String"]["output"]>
	semi_major_axis_km: Maybe<Scalars["Float"]["output"]>
}

export type PayloadsFind = {
	apoapsis_km: InputMaybe<Scalars["Float"]["input"]>
	customer: InputMaybe<Scalars["String"]["input"]>
	eccentricity: InputMaybe<Scalars["Float"]["input"]>
	epoch: InputMaybe<Scalars["Date"]["input"]>
	inclination_deg: InputMaybe<Scalars["Float"]["input"]>
	lifespan_years: InputMaybe<Scalars["Float"]["input"]>
	longitude: InputMaybe<Scalars["Float"]["input"]>
	manufacturer: InputMaybe<Scalars["String"]["input"]>
	mean_motion: InputMaybe<Scalars["Float"]["input"]>
	nationality: InputMaybe<Scalars["String"]["input"]>
	norad_id: InputMaybe<Scalars["Int"]["input"]>
	orbit: InputMaybe<Scalars["String"]["input"]>
	payload_id: InputMaybe<Scalars["ID"]["input"]>
	payload_type: InputMaybe<Scalars["String"]["input"]>
	periapsis_km: InputMaybe<Scalars["Float"]["input"]>
	period_min: InputMaybe<Scalars["Float"]["input"]>
	raan: InputMaybe<Scalars["Float"]["input"]>
	reference_system: InputMaybe<Scalars["String"]["input"]>
	regime: InputMaybe<Scalars["String"]["input"]>
	reused: InputMaybe<Scalars["Boolean"]["input"]>
	semi_major_axis_km: InputMaybe<Scalars["Float"]["input"]>
}

export type Query = {
	_service: _Service
	capsule: Maybe<Capsule>
	capsules: Maybe<Array<Maybe<Capsule>>>
	capsulesPast: Maybe<Array<Maybe<Capsule>>>
	capsulesUpcoming: Maybe<Array<Maybe<Capsule>>>
	company: Maybe<Info>
	core: Maybe<Core>
	cores: Maybe<Array<Maybe<Core>>>
	coresPast: Maybe<Array<Maybe<Core>>>
	coresUpcoming: Maybe<Array<Maybe<Core>>>
	dragon: Maybe<Dragon>
	dragons: Maybe<Array<Maybe<Dragon>>>
	histories: Maybe<Array<Maybe<History>>>
	historiesResult: Maybe<HistoriesResult>
	history: Maybe<History>
	landpad: Maybe<Landpad>
	landpads: Maybe<Array<Maybe<Landpad>>>
	launch: Maybe<Launch>
	launchLatest: Maybe<Launch>
	launchNext: Maybe<Launch>
	launches: Maybe<Array<Maybe<Launch>>>
	launchesPast: Maybe<Array<Maybe<Launch>>>
	launchesPastResult: Maybe<LaunchesPastResult>
	launchesUpcoming: Maybe<Array<Maybe<Launch>>>
	launchpad: Maybe<Launchpad>
	launchpads: Maybe<Array<Maybe<Launchpad>>>
	/** @deprecated Mission is not available on REST API after MongoDB deprecation */
	mission: Maybe<Mission>
	/** @deprecated Mission is not available on REST API after MongoDB deprecation */
	missions: Maybe<Array<Maybe<Mission>>>
	/** @deprecated Mission is not available on REST API after MongoDB deprecation */
	missionsResult: Maybe<MissionResult>
	payload: Maybe<Payload>
	payloads: Maybe<Array<Maybe<Payload>>>
	roadster: Maybe<Roadster>
	rocket: Maybe<Rocket>
	rockets: Maybe<Array<Maybe<Rocket>>>
	rocketsResult: Maybe<RocketsResult>
	ship: Maybe<Ship>
	ships: Maybe<Array<Maybe<Ship>>>
	shipsResult: Maybe<ShipsResult>
	users: Array<Users>
	users_aggregate: Users_Aggregate
	users_by_pk: Maybe<Users>
}

export type Query_CapsuleArgs = {
	id: Scalars["ID"]["input"]
}

export type Query_CapsulesArgs = {
	find: InputMaybe<CapsulesFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_CapsulesPastArgs = {
	find: InputMaybe<CapsulesFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_CapsulesUpcomingArgs = {
	find: InputMaybe<CapsulesFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_CoreArgs = {
	id: Scalars["ID"]["input"]
}

export type Query_CoresArgs = {
	find: InputMaybe<CoresFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_CoresPastArgs = {
	find: InputMaybe<CoresFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_CoresUpcomingArgs = {
	find: InputMaybe<CoresFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_DragonArgs = {
	id: Scalars["ID"]["input"]
}

export type Query_DragonsArgs = {
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
}

export type Query_HistoriesArgs = {
	find: InputMaybe<HistoryFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_HistoriesResultArgs = {
	find: InputMaybe<HistoryFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_HistoryArgs = {
	id: Scalars["ID"]["input"]
}

export type Query_LandpadArgs = {
	id: Scalars["ID"]["input"]
}

export type Query_LandpadsArgs = {
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
}

export type Query_LaunchArgs = {
	id: Scalars["ID"]["input"]
}

export type Query_LaunchLatestArgs = {
	offset: InputMaybe<Scalars["Int"]["input"]>
}

export type Query_LaunchNextArgs = {
	offset: InputMaybe<Scalars["Int"]["input"]>
}

export type Query_LaunchesArgs = {
	find: InputMaybe<LaunchFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_LaunchesPastArgs = {
	find: InputMaybe<LaunchFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_LaunchesPastResultArgs = {
	find: InputMaybe<LaunchFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_LaunchesUpcomingArgs = {
	find: InputMaybe<LaunchFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_LaunchpadArgs = {
	id: Scalars["ID"]["input"]
}

export type Query_LaunchpadsArgs = {
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
}

export type Query_MissionArgs = {
	id: Scalars["ID"]["input"]
}

export type Query_MissionsArgs = {
	find: InputMaybe<MissionsFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
}

export type Query_MissionsResultArgs = {
	find: InputMaybe<MissionsFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
}

export type Query_PayloadArgs = {
	id: Scalars["ID"]["input"]
}

export type Query_PayloadsArgs = {
	find: InputMaybe<PayloadsFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_RocketArgs = {
	id: Scalars["ID"]["input"]
}

export type Query_RocketsArgs = {
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
}

export type Query_RocketsResultArgs = {
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
}

export type Query_ShipArgs = {
	id: Scalars["ID"]["input"]
}

export type Query_ShipsArgs = {
	find: InputMaybe<ShipsFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_ShipsResultArgs = {
	find: InputMaybe<ShipsFind>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order: InputMaybe<Scalars["String"]["input"]>
	sort: InputMaybe<Scalars["String"]["input"]>
}

export type Query_UsersArgs = {
	distinct_on: InputMaybe<Array<Users_Select_Column>>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order_by: InputMaybe<Array<Users_Order_By>>
	where: InputMaybe<Users_Bool_Exp>
}

export type Query_Users_AggregateArgs = {
	distinct_on: InputMaybe<Array<Users_Select_Column>>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order_by: InputMaybe<Array<Users_Order_By>>
	where: InputMaybe<Users_Bool_Exp>
}

export type Query_Users_By_PkArgs = {
	id: Scalars["uuid"]["input"]
}

export type Result = {
	totalCount: Maybe<Scalars["Int"]["output"]>
}

export type Roadster = {
	apoapsis_au: Maybe<Scalars["Float"]["output"]>
	details: Maybe<Scalars["String"]["output"]>
	earth_distance_km: Maybe<Scalars["Float"]["output"]>
	earth_distance_mi: Maybe<Scalars["Float"]["output"]>
	eccentricity: Maybe<Scalars["Float"]["output"]>
	epoch_jd: Maybe<Scalars["Float"]["output"]>
	inclination: Maybe<Scalars["Float"]["output"]>
	launch_date_unix: Maybe<Scalars["Date"]["output"]>
	launch_date_utc: Maybe<Scalars["Date"]["output"]>
	launch_mass_kg: Maybe<Scalars["Int"]["output"]>
	launch_mass_lbs: Maybe<Scalars["Int"]["output"]>
	longitude: Maybe<Scalars["Float"]["output"]>
	mars_distance_km: Maybe<Scalars["Float"]["output"]>
	mars_distance_mi: Maybe<Scalars["Float"]["output"]>
	name: Maybe<Scalars["String"]["output"]>
	norad_id: Maybe<Scalars["Int"]["output"]>
	orbit_type: Maybe<Scalars["Float"]["output"]>
	periapsis_arg: Maybe<Scalars["Float"]["output"]>
	periapsis_au: Maybe<Scalars["Float"]["output"]>
	period_days: Maybe<Scalars["Float"]["output"]>
	semi_major_axis_au: Maybe<Scalars["Float"]["output"]>
	speed_kph: Maybe<Scalars["Float"]["output"]>
	speed_mph: Maybe<Scalars["Float"]["output"]>
	wikipedia: Maybe<Scalars["String"]["output"]>
}

export type Rocket = {
	active: Maybe<Scalars["Boolean"]["output"]>
	boosters: Maybe<Scalars["Int"]["output"]>
	company: Maybe<Scalars["String"]["output"]>
	cost_per_launch: Maybe<Scalars["Int"]["output"]>
	country: Maybe<Scalars["String"]["output"]>
	description: Maybe<Scalars["String"]["output"]>
	diameter: Maybe<Distance>
	engines: Maybe<RocketEngines>
	first_flight: Maybe<Scalars["Date"]["output"]>
	first_stage: Maybe<RocketFirstStage>
	height: Maybe<Distance>
	id: Maybe<Scalars["ID"]["output"]>
	landing_legs: Maybe<RocketLandingLegs>
	mass: Maybe<Mass>
	name: Maybe<Scalars["String"]["output"]>
	payload_weights: Maybe<Array<Maybe<RocketPayloadWeight>>>
	second_stage: Maybe<RocketSecondStage>
	stages: Maybe<Scalars["Int"]["output"]>
	success_rate_pct: Maybe<Scalars["Int"]["output"]>
	type: Maybe<Scalars["String"]["output"]>
	wikipedia: Maybe<Scalars["String"]["output"]>
}

export type RocketEngines = {
	engine_loss_max: Maybe<Scalars["String"]["output"]>
	layout: Maybe<Scalars["String"]["output"]>
	number: Maybe<Scalars["Int"]["output"]>
	propellant_1: Maybe<Scalars["String"]["output"]>
	propellant_2: Maybe<Scalars["String"]["output"]>
	thrust_sea_level: Maybe<Force>
	thrust_to_weight: Maybe<Scalars["Float"]["output"]>
	thrust_vacuum: Maybe<Force>
	type: Maybe<Scalars["String"]["output"]>
	version: Maybe<Scalars["String"]["output"]>
}

export type RocketFirstStage = {
	burn_time_sec: Maybe<Scalars["Int"]["output"]>
	engines: Maybe<Scalars["Int"]["output"]>
	fuel_amount_tons: Maybe<Scalars["Float"]["output"]>
	reusable: Maybe<Scalars["Boolean"]["output"]>
	thrust_sea_level: Maybe<Force>
	thrust_vacuum: Maybe<Force>
}

export type RocketLandingLegs = {
	material: Maybe<Scalars["String"]["output"]>
	number: Maybe<Scalars["Int"]["output"]>
}

export type RocketPayloadWeight = {
	id: Maybe<Scalars["String"]["output"]>
	kg: Maybe<Scalars["Int"]["output"]>
	lb: Maybe<Scalars["Int"]["output"]>
	name: Maybe<Scalars["String"]["output"]>
}

export type RocketSecondStage = {
	burn_time_sec: Maybe<Scalars["Int"]["output"]>
	engines: Maybe<Scalars["Int"]["output"]>
	fuel_amount_tons: Maybe<Scalars["Float"]["output"]>
	payloads: Maybe<RocketSecondStagePayloads>
	thrust: Maybe<Force>
}

export type RocketSecondStagePayloadCompositeFairing = {
	diameter: Maybe<Distance>
	height: Maybe<Distance>
}

export type RocketSecondStagePayloads = {
	composite_fairing: Maybe<RocketSecondStagePayloadCompositeFairing>
	option_1: Maybe<Scalars["String"]["output"]>
}

export type RocketsResult = {
	data: Maybe<Array<Maybe<Rocket>>>
	result: Maybe<Result>
}

export type Ship = {
	abs: Maybe<Scalars["Int"]["output"]>
	active: Maybe<Scalars["Boolean"]["output"]>
	attempted_landings: Maybe<Scalars["Int"]["output"]>
	class: Maybe<Scalars["Int"]["output"]>
	course_deg: Maybe<Scalars["Int"]["output"]>
	home_port: Maybe<Scalars["String"]["output"]>
	id: Maybe<Scalars["ID"]["output"]>
	image: Maybe<Scalars["String"]["output"]>
	imo: Maybe<Scalars["Int"]["output"]>
	missions: Maybe<Array<Maybe<ShipMission>>>
	mmsi: Maybe<Scalars["Int"]["output"]>
	model: Maybe<Scalars["String"]["output"]>
	name: Maybe<Scalars["String"]["output"]>
	position: Maybe<ShipLocation>
	roles: Maybe<Array<Maybe<Scalars["String"]["output"]>>>
	speed_kn: Maybe<Scalars["Float"]["output"]>
	status: Maybe<Scalars["String"]["output"]>
	successful_landings: Maybe<Scalars["Int"]["output"]>
	type: Maybe<Scalars["String"]["output"]>
	url: Maybe<Scalars["String"]["output"]>
	weight_kg: Maybe<Scalars["Int"]["output"]>
	weight_lbs: Maybe<Scalars["Int"]["output"]>
	year_built: Maybe<Scalars["Int"]["output"]>
}

export type ShipLocation = {
	latitude: Maybe<Scalars["Float"]["output"]>
	longitude: Maybe<Scalars["Float"]["output"]>
}

export type ShipMission = {
	flight: Maybe<Scalars["String"]["output"]>
	name: Maybe<Scalars["String"]["output"]>
}

export type ShipsFind = {
	abs: InputMaybe<Scalars["Int"]["input"]>
	active: InputMaybe<Scalars["Boolean"]["input"]>
	attempted_landings: InputMaybe<Scalars["Int"]["input"]>
	class: InputMaybe<Scalars["Int"]["input"]>
	course_deg: InputMaybe<Scalars["Int"]["input"]>
	home_port: InputMaybe<Scalars["String"]["input"]>
	id: InputMaybe<Scalars["ID"]["input"]>
	imo: InputMaybe<Scalars["Int"]["input"]>
	latitude: InputMaybe<Scalars["Float"]["input"]>
	longitude: InputMaybe<Scalars["Float"]["input"]>
	mission: InputMaybe<Scalars["String"]["input"]>
	mmsi: InputMaybe<Scalars["Int"]["input"]>
	model: InputMaybe<Scalars["String"]["input"]>
	name: InputMaybe<Scalars["String"]["input"]>
	role: InputMaybe<Scalars["String"]["input"]>
	speed_kn: InputMaybe<Scalars["Int"]["input"]>
	status: InputMaybe<Scalars["String"]["input"]>
	successful_landings: InputMaybe<Scalars["Int"]["input"]>
	type: InputMaybe<Scalars["String"]["input"]>
	weight_kg: InputMaybe<Scalars["Int"]["input"]>
	weight_lbs: InputMaybe<Scalars["Int"]["input"]>
	year_built: InputMaybe<Scalars["Int"]["input"]>
}

export type ShipsResult = {
	data: Maybe<Array<Maybe<Ship>>>
	result: Maybe<Result>
}

export type String_Comparison_Exp = {
	_eq: InputMaybe<Scalars["String"]["input"]>
	_gt: InputMaybe<Scalars["String"]["input"]>
	_gte: InputMaybe<Scalars["String"]["input"]>
	_ilike: InputMaybe<Scalars["String"]["input"]>
	_in: InputMaybe<Array<Scalars["String"]["input"]>>
	_is_null: InputMaybe<Scalars["Boolean"]["input"]>
	_like: InputMaybe<Scalars["String"]["input"]>
	_lt: InputMaybe<Scalars["String"]["input"]>
	_lte: InputMaybe<Scalars["String"]["input"]>
	_neq: InputMaybe<Scalars["String"]["input"]>
	_nilike: InputMaybe<Scalars["String"]["input"]>
	_nin: InputMaybe<Array<Scalars["String"]["input"]>>
	_nlike: InputMaybe<Scalars["String"]["input"]>
	_nsimilar: InputMaybe<Scalars["String"]["input"]>
	_similar: InputMaybe<Scalars["String"]["input"]>
}

export type Subscription = {
	users: Array<Users>
	users_aggregate: Users_Aggregate
	users_by_pk: Maybe<Users>
}

export type Subscription_UsersArgs = {
	distinct_on: InputMaybe<Array<Users_Select_Column>>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order_by: InputMaybe<Array<Users_Order_By>>
	where: InputMaybe<Users_Bool_Exp>
}

export type Subscription_Users_AggregateArgs = {
	distinct_on: InputMaybe<Array<Users_Select_Column>>
	limit: InputMaybe<Scalars["Int"]["input"]>
	offset: InputMaybe<Scalars["Int"]["input"]>
	order_by: InputMaybe<Array<Users_Order_By>>
	where: InputMaybe<Users_Bool_Exp>
}

export type Subscription_Users_By_PkArgs = {
	id: Scalars["uuid"]["input"]
}

export type Volume = {
	cubic_feet: Maybe<Scalars["Int"]["output"]>
	cubic_meters: Maybe<Scalars["Int"]["output"]>
}

export type _Service = {
	sdl: Maybe<Scalars["String"]["output"]>
}

export type Conflict_Action = "ignore" | "update"

export type Link__Purpose = "EXECUTION" | "SECURITY"

export type Order_By =
	| "asc"
	| "asc_nulls_first"
	| "asc_nulls_last"
	| "desc"
	| "desc_nulls_first"
	| "desc_nulls_last"

export type Timestamptz_Comparison_Exp = {
	_eq: InputMaybe<Scalars["timestamptz"]["input"]>
	_gt: InputMaybe<Scalars["timestamptz"]["input"]>
	_gte: InputMaybe<Scalars["timestamptz"]["input"]>
	_in: InputMaybe<Array<Scalars["timestamptz"]["input"]>>
	_is_null: InputMaybe<Scalars["Boolean"]["input"]>
	_lt: InputMaybe<Scalars["timestamptz"]["input"]>
	_lte: InputMaybe<Scalars["timestamptz"]["input"]>
	_neq: InputMaybe<Scalars["timestamptz"]["input"]>
	_nin: InputMaybe<Array<Scalars["timestamptz"]["input"]>>
}

export type Users = {
	id: Scalars["uuid"]["output"]
	name: Maybe<Scalars["String"]["output"]>
	rocket: Maybe<Scalars["String"]["output"]>
	timestamp: Scalars["timestamptz"]["output"]
	twitter: Maybe<Scalars["String"]["output"]>
}

export type Users_Aggregate = {
	aggregate: Maybe<Users_Aggregate_Fields>
	nodes: Array<Users>
}

export type Users_Aggregate_Fields = {
	count: Maybe<Scalars["Int"]["output"]>
	max: Maybe<Users_Max_Fields>
	min: Maybe<Users_Min_Fields>
}

export type Users_Aggregate_Fields_CountArgs = {
	columns: InputMaybe<Array<Users_Select_Column>>
	distinct: InputMaybe<Scalars["Boolean"]["input"]>
}

export type Users_Aggregate_Order_By = {
	count: InputMaybe<Order_By>
	max: InputMaybe<Users_Max_Order_By>
	min: InputMaybe<Users_Min_Order_By>
}

export type Users_Arr_Rel_Insert_Input = {
	data: Array<Users_Insert_Input>
	on_conflict: InputMaybe<Users_On_Conflict>
}

export type Users_Bool_Exp = {
	_and: InputMaybe<Array<InputMaybe<Users_Bool_Exp>>>
	_not: InputMaybe<Users_Bool_Exp>
	_or: InputMaybe<Array<InputMaybe<Users_Bool_Exp>>>
	id: InputMaybe<Uuid_Comparison_Exp>
	name: InputMaybe<String_Comparison_Exp>
	rocket: InputMaybe<String_Comparison_Exp>
	timestamp: InputMaybe<Timestamptz_Comparison_Exp>
	twitter: InputMaybe<String_Comparison_Exp>
}

export type Users_Constraint =
	| "constraint"
	| "key"
	| "or"
	| "primary"
	| "unique"
	| "users_pkey"

export type Users_Insert_Input = {
	id: InputMaybe<Scalars["uuid"]["input"]>
	name: InputMaybe<Scalars["String"]["input"]>
	rocket: InputMaybe<Scalars["String"]["input"]>
	timestamp: InputMaybe<Scalars["timestamptz"]["input"]>
	twitter: InputMaybe<Scalars["String"]["input"]>
}

export type Users_Max_Fields = {
	name: Maybe<Scalars["String"]["output"]>
	rocket: Maybe<Scalars["String"]["output"]>
	timestamp: Maybe<Scalars["timestamptz"]["output"]>
	twitter: Maybe<Scalars["String"]["output"]>
}

export type Users_Max_Order_By = {
	name: InputMaybe<Order_By>
	rocket: InputMaybe<Order_By>
	timestamp: InputMaybe<Order_By>
	twitter: InputMaybe<Order_By>
}

export type Users_Min_Fields = {
	name: Maybe<Scalars["String"]["output"]>
	rocket: Maybe<Scalars["String"]["output"]>
	timestamp: Maybe<Scalars["timestamptz"]["output"]>
	twitter: Maybe<Scalars["String"]["output"]>
}

export type Users_Min_Order_By = {
	name: InputMaybe<Order_By>
	rocket: InputMaybe<Order_By>
	timestamp: InputMaybe<Order_By>
	twitter: InputMaybe<Order_By>
}

export type Users_Mutation_Response = {
	affected_rows: Scalars["Int"]["output"]
	returning: Array<Users>
}

export type Users_Obj_Rel_Insert_Input = {
	data: Users_Insert_Input
	on_conflict: InputMaybe<Users_On_Conflict>
}

export type Users_On_Conflict = {
	constraint: Users_Constraint
	update_columns: Array<Users_Update_Column>
}

export type Users_Order_By = {
	id: InputMaybe<Order_By>
	name: InputMaybe<Order_By>
	rocket: InputMaybe<Order_By>
	timestamp: InputMaybe<Order_By>
	twitter: InputMaybe<Order_By>
}

export type Users_Select_Column =
	| "column"
	| "id"
	| "name"
	| "rocket"
	| "timestamp"
	| "twitter"

export type Users_Set_Input = {
	id: InputMaybe<Scalars["uuid"]["input"]>
	name: InputMaybe<Scalars["String"]["input"]>
	rocket: InputMaybe<Scalars["String"]["input"]>
	timestamp: InputMaybe<Scalars["timestamptz"]["input"]>
	twitter: InputMaybe<Scalars["String"]["input"]>
}

export type Users_Update_Column =
	| "column"
	| "id"
	| "name"
	| "rocket"
	| "timestamp"
	| "twitter"

export type Uuid_Comparison_Exp = {
	_eq: InputMaybe<Scalars["uuid"]["input"]>
	_gt: InputMaybe<Scalars["uuid"]["input"]>
	_gte: InputMaybe<Scalars["uuid"]["input"]>
	_in: InputMaybe<Array<Scalars["uuid"]["input"]>>
	_is_null: InputMaybe<Scalars["Boolean"]["input"]>
	_lt: InputMaybe<Scalars["uuid"]["input"]>
	_lte: InputMaybe<Scalars["uuid"]["input"]>
	_neq: InputMaybe<Scalars["uuid"]["input"]>
	_nin: InputMaybe<Array<Scalars["uuid"]["input"]>>
}

export type CompanyQueryVariables = Exact<{ [key: string]: never }>

export type CompanyQuery = {
	company:
		| { ceo: string | undefined; coo: string | undefined; cto: string | undefined }
		| undefined
}
