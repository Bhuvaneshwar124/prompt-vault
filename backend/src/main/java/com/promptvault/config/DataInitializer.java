package com.promptvault.config;

import com.promptvault.entity.Category;
import com.promptvault.entity.ERole;
import com.promptvault.entity.Role;
import com.promptvault.entity.Tag;
import com.promptvault.entity.User;
import com.promptvault.repository.CategoryRepository;
import com.promptvault.repository.RoleRepository;
import com.promptvault.repository.TagRepository;
import com.promptvault.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Roles
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseGet(() -> roleRepository.save(new Role(ERole.ROLE_USER)));

        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseGet(() -> roleRepository.save(new Role(ERole.ROLE_ADMIN)));

        // 2. Seed Default Admin User
        if (!userRepository.existsByUsername("admin")) {
            Set<Role> adminRoles = new HashSet<>();
            adminRoles.add(userRole);
            adminRoles.add(adminRole);

            User admin = User.builder()
                    .username("admin")
                    .email("admin@promptvault.com")
                    .password(passwordEncoder.encode("admin123"))
                    .firstName("System")
                    .lastName("Administrator")
                    .roles(adminRoles)
                    .build();

            userRepository.save(admin);
            System.out.println(">>> SEEDED ADMIN USER: username='admin', password='admin123'");
        }

        // 3. Seed Default Demo User
        if (!userRepository.existsByUsername("user")) {
            Set<Role> normalRoles = new HashSet<>();
            normalRoles.add(userRole);

            User normalUser = User.builder()
                    .username("user")
                    .email("user@promptvault.com")
                    .password(passwordEncoder.encode("user123"))
                    .firstName("Demo")
                    .lastName("User")
                    .roles(normalRoles)
                    .build();

            userRepository.save(normalUser);
            System.out.println(">>> SEEDED DEMO USER: username='user', password='user123'");
        }

        // 4. Seed Default Categories
        seedCategory("Software Engineering", "Prompts for coding, debugging, architecture, and code reviews", "#6366f1");
        seedCategory("Writing & Content", "Copywriting, blog posts, social media, and creative storytelling", "#ec4899");
        seedCategory("Design & Midjourney", "Image generation prompts for Midjourney, DALL-E 3, and Stable Diffusion", "#8b5cf6");
        seedCategory("Data Science & AI", "Data analysis, machine learning prompts, SQL queries, and python scripts", "#10b981");

        // 5. Seed Default Tags
        seedTag("java");
        seedTag("spring-boot");
        seedTag("react");
        seedTag("chatgpt");
        seedTag("code-review");
        seedTag("copywriting");
    }

    private void seedCategory(String name, String description, String colorCode) {
        if (!categoryRepository.existsByName(name)) {
            String slug = generateSlug(name);
            Category category = Category.builder()
                    .name(name)
                    .slug(slug)
                    .description(description)
                    .colorCode(colorCode)
                    .build();
            categoryRepository.save(category);
        }
    }

    private void seedTag(String name) {
        String cleanName = name.trim().toLowerCase(Locale.ENGLISH);
        if (!tagRepository.existsByName(cleanName)) {
            Tag tag = Tag.builder()
                    .name(cleanName)
                    .slug(generateSlug(cleanName))
                    .build();
            tagRepository.save(tag);
        }
    }

    private String generateSlug(String text) {
        return text.toLowerCase(Locale.ENGLISH)
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("[\\s-]+", "-")
                .replaceAll("^-+|-+$", "");
    }
}
