import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { NAV_THEME } from "@_latest-es/ui/native/theme";
import { useColorScheme } from "@_latest-es/ui/native/use-color-scheme";

import { authClient } from "../client";
import { validateEmail, validateName, validatePassword } from "../helpers/form-validation";

interface SignUpValues {
  name: string;
  email: string;
  password: string;
}

function validateSignUp({ value }: { value: SignUpValues }): string | undefined {
  return (
    validateName(value.name) ??
    validateEmail(value.email) ??
    validatePassword(value.password) ??
    undefined
  );
}

function getErrorMessage(error: unknown): string | null {
  if (!error) return null;

  if (typeof error === "string") {
    return error;
  }

  if (Array.isArray(error)) {
    for (const issue of error) {
      const message = getErrorMessage(issue);
      if (message) {
        return message;
      }
    }
    return null;
  }

  if (typeof error === "object" && error !== null) {
    const maybeError = error as { message?: unknown };
    if (typeof maybeError.message === "string") {
      return maybeError.message;
    }
  }

  return null;
}

function SignUp() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: validateSignUp,
    },
    onSubmit: async ({ value, formApi }) => {
      await authClient.signUp.email(
        {
          name: value.name.trim(),
          email: value.email.trim(),
          password: value.password,
        },
        {
          onError(error) {
            setError(error.error?.message || "Failed to sign up");
          },
          onSuccess() {
            setError(null);
            formApi.reset();
          },
        },
      );
    },
  });

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>

      <form.Subscribe
        selector={(state) => ({
          isSubmitting: state.isSubmitting,
          validationError: getErrorMessage(state.errorMap.onSubmit),
        })}
      >
        {({ isSubmitting, validationError }) => {
          const formError = error ?? validationError;

          return (
            <>
              {formError ? (
                <View
                  style={[styles.errorContainer, { backgroundColor: theme.notification + "20" }]}
                >
                  <Text style={[styles.errorText, { color: theme.notification }]}>{formError}</Text>
                </View>
              ) : null}

              <form.Field name="name">
                {(field) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        color: theme.text,
                        borderColor: theme.border,
                        backgroundColor: theme.background,
                      },
                    ]}
                    placeholder="Name"
                    placeholderTextColor={theme.text}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChangeText={(value) => {
                      field.handleChange(value);
                      if (error) {
                        setError(null);
                      }
                    }}
                  />
                )}
              </form.Field>

              <form.Field name="email">
                {(field) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        color: theme.text,
                        borderColor: theme.border,
                        backgroundColor: theme.background,
                      },
                    ]}
                    placeholder="Email"
                    placeholderTextColor={theme.text}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChangeText={(value) => {
                      field.handleChange(value);
                      if (error) {
                        setError(null);
                      }
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              </form.Field>

              <form.Field name="password">
                {(field) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        color: theme.text,
                        borderColor: theme.border,
                        backgroundColor: theme.background,
                      },
                    ]}
                    placeholder="Password"
                    placeholderTextColor={theme.text}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChangeText={(value) => {
                      field.handleChange(value);
                      if (error) {
                        setError(null);
                      }
                    }}
                    secureTextEntry
                    onSubmitEditing={form.handleSubmit}
                  />
                )}
              </form.Field>

              <TouchableOpacity
                onPress={form.handleSubmit}
                disabled={isSubmitting}
                style={[
                  styles.button,
                  {
                    backgroundColor: theme.primary,
                    opacity: isSubmitting ? 0.5 : 1,
                  },
                ]}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </>
          );
        }}
      </form.Subscribe>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  errorContainer: {
    marginBottom: 12,
    padding: 8,
  },
  errorText: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export { SignUp };
