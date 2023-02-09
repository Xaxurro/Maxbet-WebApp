import styled from "styled-components";
import Layout from "../Components/Layout";
import React from 'react';

//////////////////////////////////////////////////////////////
/**
 * Componentes de estilo
 */
const Container = styled.div`
    display:grid;
    width:100%;
    height:100%;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
        "content content"
        "content content";
    grid-gap: 20px;
    
`
const ContentBox = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  align-items: center;
  grid-area: content;
  justify-content: center;
`

const ElementoGrid1 = styled.div`
  background: #a6b8b9;
  padding: 0.25rem;
  width: 100%;
  height: 100%;
`
const ElementoGrid2 = styled(ElementoGrid1)``;
const ElementoGrid3 = styled(ElementoGrid1)``;
const ElementoGrid4 = styled(ElementoGrid1)``;
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
/**
 * TODO
 * @returns placeholders de layout tipo grid
 */
function Dashboard() {
    return (
        <Layout>
            <Container>                
                <ContentBox>
                    <ElementoGrid1>Uno</ElementoGrid1>
                    <ElementoGrid2>dos</ElementoGrid2>
                    <ElementoGrid3>tres</ElementoGrid3>
                    <ElementoGrid4>cuatro</ElementoGrid4>
                </ContentBox>
            </Container>
        </Layout>
    )
}
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

export default Dashboard