import mongodb from 'mongodb'

export type TransactionsType = {
    amount: number
	date: string
	description: string
}

export class Transaction {
  private collection: mongodb.Collection<TransactionsType>

  constructor(db: mongodb.Db) {
    this.collection = db.collection('transactions')
  }

  async create(data: TransactionsType) {
    try {
      const result = await this.collection.insertOne(data)
      console.log('Insert result %j', result)
    } catch (error) {
      throw error
    }
  }

  async getAll() {
    let Transactions: TransactionsType[]
    try {
      Transactions = await this.collection.find().toArray()
    } catch (error) {
      throw error
    }

    return Transactions
  }

  async getByID(customerID: string) {
    let customer: TransactionsType | null
    try {
      customer = await this.collection.findOne({ _id: new mongodb.ObjectID(customerID) })
    } catch (error) {
      throw error
    }

    return customer
  }

  async update(customerID: string, updateData: Partial<TransactionsType>) {
    try {
      await this.collection.updateOne({ _id: new mongodb.ObjectID(customerID) }, { $set: updateData })
    } catch (error) {
      throw error
    }
  }


  async delete(customerID: string) {
    try {
      await this.collection.deleteOne({ _id: new mongodb.ObjectID(customerID) })
    } catch (error) {
      throw error
    }
  }
}
