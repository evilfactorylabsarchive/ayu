import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CodeMirror from 'react-codemirror'

import {
  Box,
  Button,
  ButtonPrimary,
  ButtonDanger,
  Dialog,
  Heading,
  Text,
  TextInput,
  Label,
  Link
} from '@primer/components'

require('codemirror/mode/javascript/javascript')
require('codemirror/lib/codemirror.css')

const Topbar = styled.nav`
  padding: 5px 9px;
  padding-left: 5px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #ccc;

  :before,
  :after {
    display: table;
    content: '';
    clear: both;
  }

  & h4 {
    display: inline-block;
    margin: 0.5rem;
  }
`

const TopbarLeft = styled.div`
  float: left;
  width: 20%;
`

const TopbarRight = styled.div`
  float: left;
  font-weight: normal;
  text-align: right;
  width: 80%;
`
const IndexContainer = styled.main`
  :before,
  :after {
    display: table;
    clear: both;
    content: '';
  }
`

const LeftContainer = styled.div`
  float: left;
  width: 30%;
  background-color: #fff;
  padding: 10px;
`

const RightContainer = styled.div`
  background-color: #eee;
  float: left;
  width: 70%;
  height: 100vh;
  padding: 10px;
`

const RightContent = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px;
`

const Editor = styled(CodeMirror)`
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 2px;
`

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [payload, setPayload] = useState({})
  const [token, setToken] = useState('')

  const setData = content => {
    payload.data = JSON.stringify(content)
  }

  const payloadId = payload.meta && payload.meta.id

  useEffect(() => {
    const payload = {
      meta: {
        id: 'tb2sgd7',
        token: '8ff68ba70b568d3e27de53b48afb7xxx',
        timestamp: '1567747411xxx'
      },
      data: {
        id: '68d3e27de53b48af',
        name: 'fariz',
        job: 'software engineer'
      }
    }
    setPayload(payload)
  }, [])

  return (
    <>
      <Topbar>
        <TopbarLeft>
          <h4>{payloadId || 'Loading...'}</h4>
          <Label m={0}>public</Label>
        </TopbarLeft>
        <TopbarRight>
          <Button>Buat baru</Button>
        </TopbarRight>
      </Topbar>
      <IndexContainer>
        <Dialog
          title='Hapus data'
          isOpen={isModalOpen}
          onDismiss={() => setIsModalOpen(false)}
        >
          <Box p={3}>
            <Text as='p'>
              Untuk menghapus data ini, mohon masukkan token untuk melanjutkan:
            </Text>
            <TextInput
              placeholder='md5(id + timestamp)'
              block={true}
              value={token}
              onChange={e => setToken(e.target.value)}
            />
            <ButtonDanger
              mt={2}
              style={{ display: 'block', width: '100%' }}
              disabled={token.length < 5}
            >
              Hapus
            </ButtonDanger>
          </Box>
        </Dialog>
        <LeftContainer></LeftContainer>
        <RightContainer>
          <RightContent>
            <Heading fontSize={3} mt={2} mb={2}>
              API Endpoint
            </Heading>
            <Link
              fontSize={24}
              color='black'
              mb={1}
              href={`https://tinkering.evilfactory.id/api/${payloadId}`}
            >
              {`https://tinkering.evilfactory.id/api/${payloadId}`}
            </Link>
            <Editor
              value={JSON.stringify(payload.data)}
              defaultValue='{}'
              options={{
                mode: {
                  name: 'javascript',
                  json: true
                },
                lineNumbers: true
              }}
              onChange={content => setData(content)}
            />
            <IndexContainer>
              <LeftContainer
                style={{ paddingLeft: 0, paddingBottom: 0, paddingTop: 0 }}
              >
                <ButtonPrimary mt={2}>Simpan</ButtonPrimary>
              </LeftContainer>
              <RightContainer
                style={{
                  paddingRight: 0,
                  paddingBottom: 0,
                  paddingTop: 0,
                  textAlign: 'right',
                  height: 'auto',
                  backgroundColor: 'transparent'
                }}
              >
                <ButtonDanger mt={2} onClick={() => setIsModalOpen(true)}>
                  Hapus
                </ButtonDanger>
              </RightContainer>
            </IndexContainer>
          </RightContent>
        </RightContainer>
      </IndexContainer>
    </>
  )
}

export default App
