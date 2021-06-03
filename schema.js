const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,
} = require('graphql')

// Mock data
const customers = [
	{
		id: '1',
		name: 'Liu Kang',
		email: 'kang@earthrealm.com',
		age: 25,
	},
	{
		id: '2',
		name: 'Sonya Blade',
		email: 'blade@earthrealm.com',
		age: 27,
	},
	{
		id: '3',
		name: 'Kung Lao',
		email: 'lao@earthrealm.com',
		age: 32,
	},
]

// Create Customer Type
const CustomerType = new GraphQLObjectType({
	name: 'Customer',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		age: { type: GraphQLInt },
	}),
})

// Root Query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		customer: {
			type: CustomerType,
			args: {
				id: { type: GraphQLString },
			},
			resolve(parentValue, args) {
				for (let i = 0; i, customers.length; i++) {
					if (customers[i].id === args.id) {
						return customers[i]
					}
				}
			},
		},
		customers: {
			type: new GraphQLList(CustomerType),
			resolve(parentValue) {
				return customers
			},
		},
	},
})

module.exports = new GraphQLSchema({
	query: RootQuery,
})
