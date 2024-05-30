import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { AuthProvider } from "../contexts/AuthContext";

describe("LoginForm", () => {
  it("should render the login form", () => {
    render(
      <AuthProvider>
        <Router>
          <LoginForm onSubmit={jest.fn()} isSubmitting={false} />
        </Router>
      </AuthProvider>
    );

    expect(screen.getByLabelText(/nom d'utilisateur ou courriel/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /connexion/i})).toBeInTheDocument();
  });
});
