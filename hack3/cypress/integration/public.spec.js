describe('Hackathon 3 Public Test', () => {
  it('1 (5%)', () => {
    cy.visit({ url: 'localhost:4000', failOnStatusCode: false })
  })
  it('2 (5%)', () => {
    cy.request('localhost:4000/api/getStations')
    .then((response) => {
      expect(response.status).to.not.equal(404)
    })
  })
  it('3 (20%)', () => {
    cy.request('localhost:4000/api/getStations')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('data')
      expect(response.body.data).to.have.property('R')
      expect(response.body.data).to.have.property('G')
      expect(response.body.data.R).to.have.length(10)
      expect(response.body.data.G).to.have.length(11)
    })
  })
  it('4-1 (5%)', () => {
    cy.visit('localhost:3000')
    cy.get('#s-G4 .station-rectangle').should('contain', 'G4')
    cy.get('#s-G4 .station-name').should('contain', '大坪林')
    cy.get('#s-G9 .station-rectangle').should('contain', 'G9')
    cy.get('#s-G9 .station-name').should('contain', '古亭')
    cy.get('#s-R3 .station-rectangle').should('contain', 'R3')
    cy.get('#s-R3 .station-name').should('contain', '信義安和')
    cy.get('#s-R8 .station-rectangle').should('contain', 'R8')
    cy.get('#s-R8 .station-name').should('contain', '台大醫院')
    
  })
  it('4-2 (5%)', () => {
    cy.visit('localhost:3000')
    cy.get('#s-G6 .station-rectangle').should('have.css', 'border', '5px solid rgb(27, 77, 0)')
    cy.get('#s-G6 .station-rectangle').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    cy.get('#l-G3').should('have.css', 'background-color', 'rgb(27, 77, 0)')
    cy.get('#s-R9 .station-rectangle').should('have.css', 'border', '5px solid rgb(206, 4, 4)')
    cy.get('#s-R9 .station-rectangle').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    cy.get('#l-R4').should('have.css', 'background-color', 'rgb(206, 4, 4)')
  })
  it('4-3 (5%)', () => {
    cy.visit('localhost:3000')
    cy.get('#s-G11 .station-rectangle').should('have.css', 'border', '5px solid rgb(27, 77, 0)')
    cy.get('#s-G11 .station-rectangle').should('have.css', 'background-color', 'rgb(27, 77, 0)')
    cy.get('#s-R1 .station-rectangle').should('have.css', 'border', '5px solid rgb(206, 4, 4)')
    cy.get('#s-R1 .station-rectangle').should('have.css', 'background-color', 'rgb(206, 4, 4)')    
  })
  it('4-4 (5%)', () => {
    cy.visit('localhost:3000')
    cy.get('#l-R10').should('not.exist')
    cy.get('#l-G11').should('not.exist')
  })
  it('5 (15%)', ()=>{
    cy.visit('localhost:3000')
    cy.get('#s-G8').click()
    cy.get('#table-station_name-label').should('contain', '車站名稱')
    cy.get('#table-address-label').should('contain', '車站位址')
    cy.get('#table-service_counter-label').should('contain', '詢問處位置')
    cy.get('#table-enable_bicycle-label').should('contain', '自行車進出')

    cy.get('#table-station_name-value').should('contain', '台電大樓')
    cy.get('#table-address-value').should('contain', '臺北市中正區羅斯福路3段126之5號B1')
    cy.get('#table-service_counter-value').should('contain', '近出口3')
    cy.get('#table-enable_bicycle-value').should('contain', '開放')

    cy.get('#s-R10').click()
    cy.get('#table-station_name-value').should('contain', '中山')
    cy.get('#table-address-value').should('contain', '臺北市大同區南京西路16號')
    cy.get('#table-service_counter-value').should('contain', '近出口1、4，近出口5、6')
    cy.get('#table-enable_bicycle-value').should('contain', '不開放')
  })
  it('6 (15%)', () => {
    cy.visit('localhost:3000')
    cy.get('#start-select').find('optgroup').should('have.length', 2)
    cy.get('#start-group-G1').should('exist')
    cy.get('#start-group-G11').should('exist')
    cy.get('#start-group-G5').should('exist')
    cy.get('#start-group-R6').should('exist')
    cy.get('#start-group-R1').should('exist')
    cy.get('#start-group-R10').should('exist')

    cy.get('#end-select').find('optgroup').should('have.length', 2)
    cy.get('#end-group-G1').should('exist')
    cy.get('#end-group-G11').should('exist')
    cy.get('#end-group-G3').should('exist')
    cy.get('#end-group-R2').should('exist')
    cy.get('#end-group-R1').should('exist')
    cy.get('#end-group-R10').should('exist')
  })
  it('7-1 (5%)', () => {
    cy.request('localhost:4000/api/calculateDistance?start=R1&end=G1')
    .then((response) => {
      expect(response.status).to.not.equal(404)
    })
  })
  it('7-2 (10%)', () => {
    cy.request('localhost:4000/api/calculateDistance?start=R5&end=G11')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('distance')
      expect(response.body.distance).to.eq(14)
    })

    cy.request('localhost:4000/api/calculateDistance?start=G4&end=R9')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('distance')
      expect(response.body.distance).to.eq(36)
    })

    cy.request('localhost:4000/api/calculateDistance?start=R9&end=G4')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('distance')
      expect(response.body.distance).to.eq(-1)
    })
  })
  it('7-3 (5%)', () => {
    cy.visit('localhost:3000')
    cy.get('#answer').should('contain', '')

    cy.get('#start-select').select('萬隆')
    cy.get('#end-select').select('中山')
    cy.get('#search-btn').click()
    cy.get('#answer').should('contain', '37' || 37)

    cy.get('#start-select').select('信義安和')
    cy.get('#end-select').select('小南門')
    cy.get('#search-btn').click()
    cy.get('#answer').should('contain', '22' || 22)

    cy.get('#start-select').select('中山')
    cy.get('#end-select').select('新店')
    cy.get('#search-btn').click()
    cy.get('#answer').should('contain', 'INVALID')
  })
})
