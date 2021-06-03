const axios = require('axios')
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,
} = require('graphql')

// Mock data
// const customers = [
// 	{
// 		id: '1',
// 		name: 'Liu Kang',
// 		email: 'kang@earthrealm.com',
// 		age: 25,
// 	},
// 	{
// 		id: '2',
// 		name: 'Sonya Blade',
// 		email: 'blade@earthrealm.com',
// 		age: 27,
// 	},
// 	{
// 		id: '3',
// 		name: 'Kung Lao',
// 		email: 'lao@earthrealm.com',
// 		age: 32,
// 	},
// ]

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
			async resolve(parentValue, args) {
				try {
					const { data } = await axios.get(
						`http://localhost:3000/customers/${args.id}`,
					)
					return data
				} catch (error) {
					console.error(error)
				}

				// Mocked Data Logic
				// for (let i = 0; i, customers.length; i++) {
				// 	if (customers[i].id === args.id) {
				// 		return customers[i]
				// 	}
				// }
			},
		},
		customers: {
			type: new GraphQLList(CustomerType),
			async resolve(parentValue) {
				try {
					const { data } = await axios.get(`http://localhost:3000/customers`)
					return data
				} catch (error) {
					console.error(error)
				}
			},
		},
	},
})

// Mutations
const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		// Add Customer
		addCustomer: {
			type: CustomerType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			async resolve(parentValue, args) {
				try {
					const { data } = await axios.post(`http://localhost:3000/customers`, {
						name: args.name,
						email: args.email,
						age: args.age,
					})
					return data
				} catch (error) {
					console.error(error)
				}
			},
		},

		// Update Customer
		updateCustomer: {
			type: CustomerType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				name: { type: GraphQLString },
				email: { type: GraphQLString },
				age: { type: GraphQLInt },
			},
			async resolve(parentValue, args) {
				try {
					const { data } = await axios.patch(
						`http://localhost:3000/customers/${args.id}`,
						args,
					)
					return data
				} catch (error) {
					console.error(error)
				}
			},
		},

		// Delete Customer
		deleteCustomer: {
			type: CustomerType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
			},
			async resolve(parentValue, args) {
				try {
					const { data } = await axios.delete(
						`http://localhost:3000/customers/${args.id}`,
					)
					return data
				} catch (error) {
					console.error(error)
				}
			},
		},
	},
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation,
})
