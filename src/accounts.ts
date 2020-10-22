import mongodb from 'mongodb'

export type AccountsType = {
  account_number: string
	balance: string
	age: number
	account_type: string
}

export class Account {
  private collection: mongodb.Collection<AccountsType>

  constructor(db: mongodb.Db) {
    this.collection = db.collection('accounts')
  }

  async create(data: AccountsType) {
    try {
      const result = await this.collection.insertOne(data)
      console.log('Insert result %j', result)
    } catch (error) {
      throw error
    }
  }

  async getAll() {
    let accounts: AccountsType[]
    try {
      accounts = await this.collection.find().toArray()
    } catch (error) {
      throw error
    }

    return accounts
  }

  async getByID(customerID: string) {
    let customer: AccountsType | null
    try {
      customer = await this.collection.findOne({ _id: new mongodb.ObjectID(customerID) })
    } catch (error) {
      throw error
    }

    return customer
  }

  async update(customerID: string, updateData: Partial<AccountsType>) {
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
