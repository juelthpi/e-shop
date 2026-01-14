<template>
  <div class="reset-password-page bg-light min-h-100vh d-flex flex-column">
    <main class="flex-grow-1 d-flex align-items-center justify-content-center py-5">
      <div class="container d-flex justify-content-center">
        <div class="auth-card shadow-sm overflow-hidden bg-white rounded-5 border-0">
          <div class="row g-0">
            <!-- Left Side: Image -->
            <div class="col-lg-6 d-none d-lg-block">
              <div class="auth-img-wrapper h-100 position-relative">
                <img src="/assets/images/thumbanils/auth.jpg" alt="Reset Password" class="auth-image">
                <div class="auth-overlay"></div>
              </div>
            </div>

            <!-- Right Side: Form -->
            <div class="col-lg-6">
              <div class="auth-form-wrapper p-4 p-md-5 h-100 d-flex flex-column justify-content-center">
                <div class="text-center mb-5">
                  <h2 class="auth-title">Set New Password</h2>
                  <p class="text-muted small mt-2">Almost there! Choose a strong password to secure your account.</p>
                </div>

                <form @submit.prevent="handleResetSuccess" class="reset-form">
                  <!-- New Password -->
                  <div class="form-group mb-4">
                    <label class="form-label fw-bold mb-2">New Password <span class="text-danger">*</span></label>
                    <input 
                      type="password" 
                      v-model="newPassword" 
                      class="form-control-custom w-100" 
                      placeholder="Enter new password" 
                      required
                    >
                  </div>

                  <!-- Confirm Password -->
                  <div class="form-group mb-5">
                    <label class="form-label fw-bold mb-2">Confirm Password <span class="text-danger">*</span></label>
                    <input 
                      type="password" 
                      v-model="confirmPassword" 
                      class="form-control-custom w-100" 
                      placeholder="Confirm your password" 
                      required
                    >
                  </div>

                  <!-- Submit Button -->
                  <button type="submit" class="primary-btn reset-btn py-3 justify-content-center fw-bold w-100" :disabled="isSubmitting || !passwordsMatch">
                    <i v-if="isSubmitting" class="fa-solid fa-circle-notch fa-spin me-2"></i>
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Success Toast Notification -->
    <Transition name="toast-pop">
      <div v-if="showSuccessToast" class="success-toast">
        <div class="d-flex align-items-center gap-3">
          <div class="toast-icon bg-success-light">
             <i class="fa-solid fa-circle-check text-success"></i>
          </div>
          <div class="d-flex flex-column">
             <span class="fw-bold text-dark">Success!</span>
             <span class="text-muted small">Password updated successfully! Redirecting...</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const newPassword = ref('')
const confirmPassword = ref('')
const isSubmitting = ref(false)
const showSuccessToast = ref(false)

const passwordsMatch = computed(() => {
  return newPassword.value && newPassword.value === confirmPassword.value
})

const handleResetSuccess = async () => {
  if (!passwordsMatch.value) return
  
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  showSuccessToast.value = true
  isSubmitting.value = false

  setTimeout(() => {
    showSuccessToast.value = false
    navigateTo('/login')
  }, 2000)
}
</script>

<style scoped>
.reset-password-page { background: #fdfdfd; }
</style>
