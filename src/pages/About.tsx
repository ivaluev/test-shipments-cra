import React from 'react'
import Page from '../layout/Page'
import Container from '../layout/Container'
import styled from '../services/styled'

const About = () => {
  return (
    <Page>
      <Container>
        <PageContent>
          <h1>Welcome!</h1>
          <p>
            Welcome to the Redux 4.0.7 + TypeScript 3.8.2 example! This example site shows you the ideal project
            structure, recommended libraries, as well as design pattern on writing type-safe React (+ Redux) app with
            TypeScript.
          </p>
          <p>
            This project is intended as a test task for position of a Frontend Developer at{' '}
            <a
              href="https://github.com/freight-hub/freighthub-frontend-challenge"
              target="blank"
              rel="noopener noreferrer"
            >
              FreightHub
            </a>
            .
          </p>
          <p>
            To demonstrate it, I created a website which pulls data from the json-server and display information about
            shipments.
          </p>
          <p>Enjoy your stay!</p>
        </PageContent>
      </Container>
    </Page>
  )
}

export default About

const PageContent = styled('article')`
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  line-height: 1.6;

  a {
    color: ${props => props.theme.colors.brand};
  }

  h1,
  h2,
  h3,
  h4 {
    margin-bottom: 0.5rem;
    font-family: ${props => props.theme.fonts.headings};
    line-height: 1.25;
  }
`
