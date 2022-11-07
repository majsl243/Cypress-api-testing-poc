import { Operations, RequestFactory } from "request-payload-factory"
import { Tourist } from "../support/models/tourist"

describe('tourist model', () => {

  it('creates a toursit', () => {
    const request = RequestFactory.createForClass(Tourist).generate({});

    cy.request({
      url: "/Tourist",
      method: "POST",
      body: request
    }).then(response => {
      expect(response.status).to.equal(201)
      expect(response.body.tourist_name).to.equal(request.tourist_name)
      expect(response.body.tourist_email).to.equal(request.tourist_email)
      expect(response.body.tourist_location).to.equal(request.tourist_location)
    })
  })

  //the API does not validate the format of the email
  it.skip('creates a toursit with invalid email', () => {
    const request = 
      RequestFactory.createForClass(Tourist).generate({
        tourist_email: Operations.Override("invalid email")
      });

    cy.request({
      url: "/Tourist",
      method: "POST",
      body: request
    }).then(response => {
      expect(response.status).to.equal(400)
    })
  })


  it('creates a toursit with duplicated email address', () => {
    const request = 
      RequestFactory.createForClass(Tourist).generate({
        tourist_email: Operations.Override("examplea@email.com")
      });

    cy.request({
      url: "/Tourist",
      method: "POST",
      body: request,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(400)
      expect(response.body.Message).to.equal("Pleae try with different email address!")
    })
  })

  it('creates a toursit without tourist email', () => {
    const request = 
      RequestFactory.createForClass(Tourist).generate({
        tourist_email: Operations.Delete
      });

    cy.request({
      url: "/Tourist",
      method: "POST",
      body: request,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(500)
      expect(response.body.Message).to.equal("An error has occurred.")
    })
  })
})
