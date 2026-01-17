<template>
  <div class="policy-page">
    <!-- Breadcrumb Section -->
    <div class="container my-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent p-0">
          <li class="breadcrumb-item">
            <NuxtLink to="/" class="text-decoration-none text-muted">Home</NuxtLink>
          </li>
          <li class="breadcrumb-item text-brand active" aria-current="page">
            {{ policyData.title }}
          </li>
        </ol>
      </nav>
    </div>

    <!-- Main Content -->
    <section class="policy-content py-4 mb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 col-xl-9">
            <div class="p-4 p-lg-5 bg-white shadow-sm rounded-3 border-top border-4 border-brand">
              <!-- Page Title -->
              <h1 class="policy-title fw-bold text-black">{{ policyData.title }}</h1>
              
              <!-- Dynamic Content -->
              <div class="policy-body" v-html="policyData.content"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute();
const slug = route.params.slug;

// Define default policies data to simulate content
// In a real application, this might be fetched from an API or CMS
const policies = {
  'return-refund-policy': {
    title: 'Return & Refund Policy',
    content: `
      <p class="mb-3 text-gray p-lg">We want you to be completely satisfied with your purchase. If you are not satisfied, you may return the item within 30 days of delivery.</p>
      
      <h4 class="mt-4 mb-3 text-black">1. Eligibility for Returns</h4>
      <p class="mb-2 text-gray">To be eligible for a return, your item must be:</p>
      <ul class="list-unstyled ps-3 mb-3 text-gray">
        <li class="mb-2"><i class="bi bi-dot"></i> Unused and in the same condition that you received it.</li>
        <li class="mb-2"><i class="bi bi-dot"></i> In the original packaging.</li>
        <li class="mb-2"><i class="bi bi-dot"></i> Accompanied by the receipt or proof of purchase.</li>
      </ul>

      <h4 class="mt-4 mb-3 text-black">2. Refunds</h4>
      <p class="text-gray">Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment.</p>
    `
  },
  'exchange-policy': {
    title: 'Exchange Policy',
    content: `
      <p class="mb-3 text-gray p-lg">We only replace items if they are defective or damaged. If you need to exchange it for the same item, please send us an email.</p>
      
      <h4 class="mt-4 mb-3 text-black">Exchange Process</h4>
      <p class="text-gray">Please contact our support team with your order number and details about the product you would like to exchange. We will respond efficiently with instructions on how to return items from your order.</p>
    `
  },
  'shipping-delivery-policy': {
    title: 'Shipping & Delivery Policy',
    content: `
      <p class="mb-3 text-gray p-lg">We are dedicated to delivering your order in excellent condition and in the timeframe promised.</p>
      
      <h4 class="mt-4 mb-3 text-black">Shipping Rates</h4>
      <p class="text-gray mb-3">Shipping charges for your order will be calculated and displayed at checkout.</p>
      
      <h4 class="mt-4 mb-3 text-black">Delivery Estimates</h4>
      <p class="text-gray">Orders are typically processed within 1-2 business days. Delivery times vary depending on your location and selected shipping method.</p>
    `
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    content: `
      <p class="mb-3 text-gray p-lg">Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.</p>
      
      <h4 class="mt-4 mb-3 text-black">Information We Collect</h4>
      <p class="text-gray">We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
    `
  },
  'terms-condition': {
    title: 'Terms & Conditions',
    content: `
      <p class="mb-3 text-gray p-lg">Welcome to our website. By accessing or using our services, you agree to be bound by these terms and conditions.</p>
       <h4 class="mt-4 mb-3 text-black">Use of Service</h4>
      <p class="text-gray">You agree not to misuse our services or help anyone else do so.</p>
    `
  },
  'cancellation-policy': {
    title: 'Cancellation Policy',
    content: `
      <p class="mb-3 text-gray p-lg">Order cancellations are accepted within 24 hours of placing the order.</p>
      <h4 class="mt-4 mb-3 text-black">How to Cancel</h4>
      <p class="text-gray">Please contact our support team immediately if you wish to cancel your order.</p>
    `
  },
  'seller-policy': {
    title: 'Seller Policy',
    content: `
      <p class="mb-3 text-gray p-lg">Information regarding seller guidelines and responsibilities.</p>
    `
  },
  'product-policy': {
    title: 'Product Policy',
    content: `
      <p class="mb-3 text-gray p-lg">Guidelines on product listing, authenticity, and quality standards.</p>
    `
  },
  'delivery-policy': {
    title: 'Delivery Policy',
    content: `
      <p class="mb-3 text-gray p-lg">Detailed information about our delivery partners and improved delivery timelines.</p>
    `
  },
  'return-policy': {
    title: 'Return Policy',
    content: `
      <p class="mb-3 text-gray p-lg">Specific return guidelines for different categories of products.</p>
    `
  }
};

// Fallback for undefined policies
const defaultPolicy = {
  title: 'Page Not Found',
  content: '<p class="text-gray">The requested policy page could not be found. Please check the URL or contact support.</p>'
};

const policyData = computed(() => policies[slug] || defaultPolicy);

// Set page metadata
useHead({
  title: `${policyData.value.title} | E-Shop`,
  meta: [
    { name: 'description', content: `Read our ${policyData.value.title}` }
  ]
});
</script>

<style scoped>
.text-brand {
    color: var(--brand);
}
.border-brand {
    border-color: var(--brand) !important;
}

/* Enhanced Title & Spacing */
.policy-title {
  font-size: 3.2rem; /* 32px */
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

/* Ensure standard list styling for content injected via v-html */
:deep(.policy-body) {
  font-size: 1.6rem; /* 16px */
  line-height: 1.8;
  color: #4a4949;
}

:deep(.policy-body h4) {
  font-size: 2.2rem; /* 22px */
  font-weight: 600;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  color: #191919;
}

:deep(.policy-body p) {
  margin-bottom: 1.5rem;
}

:deep(.policy-body ul) {
  padding-left: 2rem;
  margin-bottom: 2rem;
}

:deep(.policy-body li) {
  margin-bottom: 0.8rem;
  position: relative;
}
</style>
