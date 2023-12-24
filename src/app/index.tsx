/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { AddFaPage } from './pages/AddFaPage';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material';
import { theme } from 'themes';
import PageLayout from './components/PageLayout';
import './services/cloud_database/FirebaseConfig';
import LoginPage from './pages/LoginPage';
import { UserAuth } from './context/AuthContext';
import { useEffect } from 'react';
export function App() {
  const { i18n } = useTranslation();
  const { user } = UserAuth();

  return (
    // Broser router is a router to route the different screen
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Automata"
        defaultTitle="Automata"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Automata Web" />
      </Helmet>
      <ThemeProvider theme={theme}>
        {/* Layout for the page */}
        <PageLayout>
          <Switch>
            {/* Verify if the user is login or not */}
            {user && <Route exact path="/" component={HomePage} />}
            {!user && <Route exact path="/login" component={LoginPage} />}
            {user && <Route exact path="/add" component={AddFaPage} />}
            {user && <Route exact path="/fas/:id" component={AddFaPage} />}
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </PageLayout>
      </ThemeProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
